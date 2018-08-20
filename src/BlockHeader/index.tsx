import * as React from 'react';

import withApi from '../Api/withApi';

class BlockHeader extends React.PureComponent {
  render() {
    console.log(this.props);
    return <div>sss</div>;
  }
}

export default withApi(BlockHeader);
