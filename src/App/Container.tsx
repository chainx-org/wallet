import * as React from 'react';

import { BaseProps } from '../types';

class Container extends React.PureComponent<BaseProps> {
  public render () {
    return (
      <div
        className={['ui--Container', this.props.className].join(' ')}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Container;