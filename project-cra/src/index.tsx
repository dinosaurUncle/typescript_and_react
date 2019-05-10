import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App defaultName='chris' age={31}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
