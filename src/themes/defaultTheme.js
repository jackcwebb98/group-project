import { createMuiTheme } from '@material-ui/core/styles';


const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#6AC5F4',
      dark: '#092B2B'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#f7f7f7',
      main: '#FC510B',
      hover: '#e24404',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
      typography: {
        useNextVariants: true,
      }
  },
});

export default defaultTheme


// #6AC5F4 - blue
// #FC510B - orange
// #092B2B - lighter black
// #000000 - Black
// #f7f7f7 - offwhite