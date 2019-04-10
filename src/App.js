import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from './routes'
import Profile from './components/ProfilePage'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">{routes}</div>
      </HashRouter>
    );
  }
}

export default App;
