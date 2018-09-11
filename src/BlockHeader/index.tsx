import * as React from 'react';

import { Header } from '@polkadot/primitives/header';
import { Link } from 'react-router-dom';

import withObservable from '../Api/withObservable';
import compose from '../util/compose';
import numberFormat from '../util/numberFormat';
import u8aToHex from '../util/u8aToHex';

interface Props {
  head?: Header;
}

class BlockHeader extends React.PureComponent<Props> {
  public render() {
    const { head } = this.props;

    if (!head) {
      return null;
    }

    const { parentHash, extrinsicsRoot, stateRoot } = head;

    return (
      <div>
        Head:
        <dl>
          <dt>当前块高度</dt>
          <dd>{numberFormat(head.number)}</dd>
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

export default compose(withObservable('chainNewHead', { propName: 'head' }))(BlockHeader);
