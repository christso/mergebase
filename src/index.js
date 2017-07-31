import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/index';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import routes from './routes'

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const hashHistory = ReactRouter.hashHistory;

// STEP 1 create the store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  Routes, document.getElementById('app')
);
