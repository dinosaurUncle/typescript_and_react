import * as React from 'react';
import './App.css';
import {Store} from 'redux';

import logo from './logo.svg';

class App extends React.Component<{store: Store<{age: number;}>}, {}> {
  public render() {
    const store = this.props.store;
    const state = store.getState();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {state.age}
        </p>
      </div>
    );
  }
}

export default App;
