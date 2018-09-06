import * as React from 'react';

import { Header } from '@polkadot/primitives/header';
import { Link } from 'react-router-dom';

import { IApiProps } from '../Api/types';
import withApi from '../Api/withApi';
import numberFormat from '../util/numberFormat';
import u8aToHex from '../util/u8aToHex';

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
    const { value } = this.state;

    const { parentHash, extrinsicsRoot, stateRoot } = value;

    return (
      <div>
        <dl>
          <dt>当前块高度</dt>
          <dd>{numberFormat(value.number)}</dd>
          <dt>parentHash</dt>
          <dd>
            <Link to={`/hash/${u8aToHex(parentHash)}`}>{u8aToHex(parentHash)}</Link>
          </dd>
          <dt>extrinsicsRoot</dt>
          <dd>{u8aToHex(extrinsicsRoot)}</dd>
          <dt>stateRoot</dt>
          <dd>{u8aToHex(stateRoot)}</dd>
        </dl>
      </div>
    );
  }
}

export default withApi(BlockHeader);
