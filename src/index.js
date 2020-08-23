import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';

// const rootElement = document.getElementById('root');
// if (rootElement.hasChildNodes()) {
//     ReactDOM.hydrate(<App />, rootElement);
// } else {
//     ReactDOM.render(<App />, rootElement);
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register() ;