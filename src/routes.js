import { Provider } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';

import ClientEdit from './components/clientEdit';
import ClientList from './components/clientList';
import LoginForm from './components/loginForm';
import Menu from './components/menu';
import Settings from './components/settings';
import ClientBind from './components/clientBind';
import ClientGeo from './components/clientGeo';
import AppTools from './components/appTools';
import MergeTool from './components/mergeTool';

// RETRIVES COMPONENTS BASED ON STATUS  
const Status = function ({ code, children }) {
  return (
    <Route render={function ({ staticContext }) {
      if (staticContext)
        staticContext.status = code
      return children
    }} />
  )
}

//NOT-FOUND COMPONENT
const NotFound = function () {
  return (
    <Status code={404}>
      <div>
        <h2> Sorry, can’t find this page</h2>
      </div>
    </Status>
  )
}

const routes = (
  <div>
    <Menu />
    <Switch>
      <Route exact={true} path="/" component={LoginForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/clients" component={ClientList} />
      <Route path="/settings" component={Settings} />
      <Route path="/clientgeo" component={ClientGeo} />
      <Route path="/tools" component={AppTools} />
      <Route path="/merge" component={MergeTool} />
      <Route exact={true} path="/client/edit" component={ClientEdit} />
      <Route path="/client/:id/edit" component={ClientEdit} />
      <Route exact={true} path="/client/bind" component={ClientBind} />
      <Route path="/client/:id/bind" component={ClientBind} /> 
      <Route component={NotFound}/>
    </Switch>
  </div>
);

export default routes;

