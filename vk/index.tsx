import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Cart from './Cart';

ReactDOM.render(
  <Provider store={store}>
    <Cart />
  </Provider>,
  document.getElementById('root')
);