import React, { Component } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from './routes'
import NavBar from './components/NavBar'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">{routes}
          <NavBar location={this.props.location} />
        </div>
      </HashRouter>
    );
  }
}

export default App;