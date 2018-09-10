import * as React from 'react';

import { Header } from '@polkadot/primitives/header';

import { IApi } from '../Api/types';
import withApi from '../Api/withApi';
// import numberFormat from '../util/numberFormat';
// import u8aToHex from '../util/u8aToHex';

interface IState {
  value: Header;
}

class BlockHeader extends React.PureComponent<IApi, IState> {
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
    return (
      <div>
        <dl>
          <dt>块详情</dt>
        </dl>
      </div>
    );
  }
}

export default withApi(BlockHeader);
