import * as React from 'react';

import { Header } from '@polkadot/primitives/header';

import { IApiProps } from '../Api/types';
import withApi from '../Api/withApi';
import numberFormat from '../util/numberFormat';

interface IState {
  value: Header;
}

class BlockHeader extends React.PureComponent<IApiProps, IState> {
  public state = {
    value: {} as Header,
  };

  public componentDidMount() {
    this.props.apiObservable.chainNewHead().subscribe((value: Header) => {
      if (value) {
        this.setState({
          value,
        });
      }
    });
  }

  public render() {
    return <div>{numberFormat(this.state.value.number)}</div>;
  }
}

export default withApi(BlockHeader);
