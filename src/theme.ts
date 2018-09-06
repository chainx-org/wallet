import { createMuiTheme } from '@material-ui/core/styles';

const theme = {
  palette: {
    primary: {
      main: '#1d2022',
    },
  },
};

export default createMuiTheme(theme);

export const globalClass = {
  '@global': {
    '.wrapper': {
      flex: 1,
      paddingLeft: 24,
      paddingRight: 24,
      display: 'flex',
      maxWidth: 1400,
    },
  }
};

