import * as React from 'react';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import withApi from './withApi';
// withObservable('democracyProposalDeposits', { paramProp: 'idNumber' })

interface IState {
  subscriptions: any[];
  value: any | undefined;
}

export default function withObservable(
  subscription: string,
  { propName = subscription, transform = (x: any) => x } = {}
) {
  return (Component: React.ComponentType): React.ComponentType<any> => {
    class WithObservable extends React.PureComponent<any, IState> {
      constructor(props: any) {
        super(props);

        this.state = {
          subscriptions: [],
          value: void 0,
        };
      }

      public componentDidMount() {
        this.subscribe();
      }

      public componentWillUnmount() {
        this.unSubscribe();
      }

      public render() {
        const { children } = this.props;
        const { value } = this.state;
        const _props = {
          ...this.props,
          [propName]: value,
        };

        return <Component {..._props}>{children}</Component>;
      }

      private subscribe(...params: Array<any>) {
        const { apiObservable } = this.props;
        const observable = apiObservable[subscription](...params);
        this.setState({
          subscriptions: [
            observable.pipe(map(transform)).subscribe((value: any) => this.triggerUpdate(this.props, value)),
          ],
        });
      }

      private unSubscribe() {
        this.state.subscriptions.forEach(subscription => subscription.unsubscribe());
      }

      public triggerUpdate = (props: any, value: any): void => {
        this.setState({ value });
      };
    }

    return withApi(WithObservable);
  };
}
