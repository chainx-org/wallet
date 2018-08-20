import * as React from 'react';

import ApiContext from './Context';

import WsProvider from '@polkadot/api-provider/ws';
import createApi from '@polkadot/api-rx';
// import defaults from '@polkadot/api-rx/defaults';

import { RxApiInterface } from '@polkadot/api-rx/types';
import { Subscription } from 'rxjs/Subscription';
import { IApiConfig } from './types';

interface IState {
  api: RxApiInterface;
  apiConnected: boolean;
  subscriptions: Subscription[];
}

export default class Api extends React.PureComponent<IApiConfig, IState> {
  constructor(props: IApiConfig) {
    super(props);
    const { url } = props;
    const api = createApi(new WsProvider(url));

    this.state = {
      api,
      apiConnected: false,
      subscriptions: [],
    };
  }

  private updateSubscriptions() {
    const { api } = this.state;

    this.unsubscribe();
    this.setState({
      subscriptions: [this.subscribeIsConnected(api)],
    });
  }

  private unsubscribe() {}

  private subscribeIsConnected(api: RxApiInterface): Subscription {
    return api.isConnected().subscribe((isConnected?: boolean) => {
      this.setState({ apiConnected: !!isConnected });
    });
  }

  componentDidMount() {}

  render() {
    return <ApiContext.Provider value={{ bbb: 1 }}>{this.props.children}</ApiContext.Provider>;
  }
}
