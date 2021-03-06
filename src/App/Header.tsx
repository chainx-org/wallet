import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { BaseProps, JssProps } from '../types';
import MainMenu from './MainMenu';

const styles = {
  pageHeader: {
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.12), inset 0 -1px 0 0 #E6E6E6',
  },
  wrapper: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    display: 'flex',
    maxWidth: 1400,
  },
  brand: {
    fontSize: 16,
    marginLeft: 24,
    'text-transform': 'uppercase',
  },
};

type Props = BaseProps & JssProps;

const Header: React.SFC<Props> = props => {
  const { classes } = props;
  return (
    <header className={classes.pageHeader}>
      <div className={classes.wrapper}>
        <div className={classes.brand}>ChainX Explorer</div>
        <MainMenu />
      </div>
    </header>
  );
};

export default withStyles(styles)(Header);
