import { createMuiTheme } from '@material-ui/core/styles';


const defaultTheme = createMuiTheme({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  palette: {
    primary: {
      light: '#f7f7f7',
      main: '#FC510B',
      dark: '#092B2B'
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#f7f7f7',
      main: '#FC510B',
      // hover: '#e24404',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
    // error: will use the default color
    // typography: {
    //   useNextVariants: true,
    // },
    background: {
      default: '#6AC5F4',
    },
  },
      typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true
      },
});



export default defaultTheme


// #6AC5F4 - blue
// #FC510B - orange
// #092B2B - lighter black
// #000000 - Black
// #f7f7f7 - offwhite