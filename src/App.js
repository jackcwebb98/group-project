import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import routes from './routes'
import NavBar from './components/NavBar'
import defaultTheme from './themes/defaultTheme'
import {RegisterState} from './RegisterState'
import {UserState} from './UserState'
import CssBaseline from '@material-ui/core/CssBaseline';


class App extends Component {
  
  render() {

    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true
      }
  });

    return (
      <UserState>
        <RegisterState>
          <HashRouter>
            <MuiThemeProvider theme={defaultTheme}>
            <div className="App">{routes}
            <CssBaseline />
              <NavBar location={this.props.location} />
            </div>
            </MuiThemeProvider>
          </HashRouter>
        </RegisterState>
      </UserState>
    );
  }
}

export default withTheme(defaultTheme)(props => (
  <App {...props} />
));