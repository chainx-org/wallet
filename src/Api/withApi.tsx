import * as React from 'react';

import ApiContext from './Context';
import { IDefaultProps } from './types';

export default function withApi(Inner: React.ComponentType, defaultProps?: IDefaultProps) {
  return class WithApi extends React.PureComponent<any> {
    render() {
      return (
        <ApiContext.Consumer>
          {apiProps => {
            return <Inner {...defaultProps} {...apiProps} {...this.props} />;
          }}
        </ApiContext.Consumer>
      );
    }
  };
}
