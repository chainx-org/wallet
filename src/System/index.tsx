import * as React from 'react';

import withObservable from '../Api/withObservable';
import compose from '../util/compose';
import numberFormat from '../util/numberFormat';
import dateFormat from '../util/dateFormat';

interface Props {
  systemVersion: string;
  systemName: string;
  systemChain: string;
}

class System extends React.PureComponent<Props> {
  public render() {
    const { systemVersion, systemName, systemChain } = this.props;
    return (
      <div>
        system:
        <ul>
          <li>systemVersion: {systemVersion}</li>
          <li>systemName: {systemName}</li>
          <li>systemChain: {systemChain}</li>
        </ul>
      </div>
    );
  }
}

export default compose(
  withObservable('systemVersion'),
  withObservable('systemName'),
  withObservable('systemChain')
)(System);
