import * as React from 'react';

import Timestamp from '../Timestamp';
import BlockHeader from '../BlockHeader';
import System from '../System';

const DashBoard: React.SFC = () => {
  return (
    <div>
      <Timestamp />
      <BlockHeader />
      <System />
    </div>
  );
};

export default DashBoard;
