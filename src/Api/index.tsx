import * as React from 'react';

import WsProvider from '@polkadot/api-provider/ws';
import createApi from '@polkadot/api-rx';
import { RxApiInterface } from '@polkadot/api-rx/types';
import { Subscription } from 'rxjs/Subscription';

import ApiObservable from './ApiObservable';
import ApiContext from './Context';
import { IApiConfig } from './types';

interface IState {
  api: RxApiInterface;
  apiConnected: boolean;
  apiObservable: ApiObservable;
  subscriptions: Subscription[];
}

export default class ApiProvider extends React.PureComponent<IApiConfig, IState> {
  constructor(props: IApiConfig) {
    super(props);
    const { url } = props;
    const api = createApi(new WsProvider(url));

    this.state = {
      api,
      apiObservable: new ApiObservable(api),
      apiConnected: false,
      subscriptions: [],
    };
  }

  public componentDidMount() {
    this.updateSubscriptions();
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  public render() {
    const { api, apiObservable, apiConnected } = this.state;
    return (
      <ApiContext.Provider value={{ api, apiObservable, apiConnected }}>{this.props.children}</ApiContext.Provider>
    );
  }

  private updateSubscriptions() {
    const { api } = this.state;

    this.unsubscribe();
    this.setState({
      subscriptions: [this.subscribeIsConnected(api)],
    });
  }

  private unsubscribe() {
    for (const subscription of this.state.subscriptions) {
      try {
        subscription.unsubscribe();
      } catch (error) {
        console.error(error);
      }
    }
  }

  private subscribeIsConnected(api: RxApiInterface): Subscription {
    return api.isConnected().subscribe((isConnected?: boolean) => {
      this.setState({ apiConnected: !!isConnected });
    });
  }
}
