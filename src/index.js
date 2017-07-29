import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import routes from './routes'

const Routes = (
  <BrowserRouter>
    {routes}
  </BrowserRouter>
);

ReactDOM.render(
  Routes, document.getElementById('app')
);
