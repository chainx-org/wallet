import * as React from 'react';

import { HashRouter } from 'react-router-dom';

import BlockHeader from '../BlockHeader';
import Container from './Container';

import Api from '../Api';

class App extends React.Component {
  public render() {
    return (
      <Api url="wss://poc-2.polkadot.io:9944/">
        <HashRouter>
          <Container>
            <BlockHeader />
          </Container>
        </HashRouter>
      </Api>
    );
  }
}

export default App;
