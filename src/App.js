import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import routes from './routes'
import NavBar from './components/NavBar'
import defaultTheme from './themes/defaultTheme'
import {RegisterState} from './RegisterState'

class App extends Component {
  
  render() {

    const theme = createMuiTheme();

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

export default withTheme()(App);