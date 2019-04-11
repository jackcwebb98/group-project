import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from './routes'
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <CssBaseline />
        <div className="App">{routes}</div>
      </HashRouter>
    );
  }
}

export default App;
