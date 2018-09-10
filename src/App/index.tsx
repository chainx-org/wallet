import * as React from 'react';

import { Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';

import ApiProvider from '../Api';
import DashBoard from '../DashBoard';
import Container from './Container';
import Header from './Header';
import theme, { globalClass } from '../theme';

const App: React.SFC = () => {
  return (
    <ApiProvider url="ws://192.168.1.11:8082/">
      <Router>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Container>
            <Header />
            <Switch>
              <Route exact path="/dashboard" component={DashBoard} />
            </Switch>
          </Container>
        </MuiThemeProvider>
      </Router>
    </ApiProvider>
  );
};

export default withStyles(globalClass)(App);
