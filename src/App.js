import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AccountCreation from './components/AccountCreation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AccountCreation></AccountCreation>
      </div>
    );
  }
}

export default App;
