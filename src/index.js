import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '../node_modules/react-toastify/dist/ReactToastify.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
