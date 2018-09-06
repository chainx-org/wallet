import * as React from 'react';

import { withRouter, RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { BaseProps, JssProps } from '../types';

const styles = {
  menu: {
    marginLeft: 48,
    display: 'flex',
  },
  menuItem: {
    color: 'rgba(0,0,0,.54)',
    marginLeft: 40,
  },
  menuItemLink: {
    color: 'inherit',
    'text-decoration': 'none',
    '&.active': {
      color: 'rgba(0,0,0,.87)',
      'font-weight': 500,
    },
    '&:hover': {
      color: 'rgba(0,0,0,.87)',
    },
  },
};

type Props = RouteComponentProps<any> & BaseProps & JssProps;

class MainMenu extends React.PureComponent<Props> {
  public render() {
    const { classes } = this.props;

    return (
      <nav className={classes.menu}>
        <div className={classes.menuItem}>
          <NavLink className={classes.menuItemLink} activeClassName="active" to="/dashboard">
            概览
          </NavLink>
        </div>
        <div className={classes.menuItem}>
          <NavLink className={classes.menuItemLink} activeClassName="active" to="/blocks">
            区块
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default withRouter(withStyles(styles)(MainMenu));
