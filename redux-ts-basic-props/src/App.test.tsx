import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import {createStore, Store} from 'redux';

const ADD_AGE = 'ADD_AGE';
/*
function addAge() {
  return {
    type: ADD_AGE
  }
}
*/
function ageApp(state: {age: number;} = {age: 31}, action: {type: 'ADD_AGE'}) {
  if (action.type === ADD_AGE) {
    return {
      age: state.age + 1
    };
  }
  return state;
}

const store: Store<{age: number;}> = createStore(ageApp);

store.subscribe(render);

function render () {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
}

it('renders without crashing', () => {
  render();
});
