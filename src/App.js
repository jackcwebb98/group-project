import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import routes from './routes'
import NavBar from './components/NavBar'
import defaultTheme from './themes/defaultTheme'
import {RegisterState} from './RegisterState'
import CssBaseline from '@material-ui/core/CssBaseline';
import Consumer from './RegisterState'


class App extends Component {
  
  render() {

    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
        suppressDeprecationWarnings: true
      }
  });

    return (
      <RegisterState>
        <HashRouter>
          <MuiThemeProvider theme={defaultTheme}>
          <div className="App">{routes}
            <NavBar location={this.props.location} />
          </div>
          </MuiThemeProvider>
        </HashRouter>
      </RegisterState>
    );
  }
}

export default withTheme()(props => (
  <Consumer>
    {RegisterState => {
      return <App {...props} RegisterState = {RegisterState} />
    }}
  </Consumer>
  ));