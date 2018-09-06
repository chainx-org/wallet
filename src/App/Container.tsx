import * as React from 'react';

import { BaseProps } from '../types';

const Container: React.SFC<BaseProps> = props => {
  return (
    <div className={['ui--Container', props.className].join(' ')} style={props.style}>
      {props.children}
    </div>
  );
};

export default Container;
