import * as React from 'react';

import withObservable from '../Api/withObservable';
import compose from '../util/compose';
import numberFormat from '../util/numberFormat';
import dateFormat from '../util/dateFormat';

interface Props {
  blockPeriod: number;
  now: string;
  didUpdate: boolean;
}

class TimeStamp extends React.PureComponent<Props> {
  public render() {
    const { blockPeriod, now, didUpdate } = this.props;
    return (
      <div>
        timestamp:
        <ul>
          <li>now: {now}</li>
          <li>blockPeriod: {blockPeriod}</li>
          <li>didUpdate: {didUpdate + ''}</li>
        </ul>
      </div>
    );
  }
}

export default compose(
  withObservable('timestampDidUpdate', { propName: 'didUpdate' }),
  withObservable('timestampBlockPeriod', { transform: numberFormat, propName: 'blockPeriod' }),
  withObservable('timestampNow', { transform: dateFormat, propName: 'now' })
)(TimeStamp);
