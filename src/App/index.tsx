import * as React from 'react';

import { HashRouter } from 'react-router-dom';

import BlockHeader from '../BlockHeader';
import Container from './Container';

import ApiProvider from '../Api';

class App extends React.Component {
  public render() {
    return (
      <ApiProvider url="wss://poc-2.polkadot.io:9944/">
        <HashRouter>
          <Container>
            <BlockHeader />
          </Container>
        </HashRouter>
      </ApiProvider>
    );
  }
}

export default App;
