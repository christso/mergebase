import axios from 'axios';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import reducers from './src/reducers/index';
import routes from './src/routes';
import { renderToString } from 'react-dom/server';

function handleRender(req, res) {
  axios.get('http://localhost:3001/clients')
    .then(function (response) {
      // STEP-1 CREATE A REDUX STORE ON THE SERVER
      const store = createStore(reducers, { "clients": { "clients": response.data } })
      // STEP-2 GET INITIAL STATE FROM THE STORE
      const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
      // STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTs AND DEFINE WHAT TO DO WITH THEM
      const context = {};
      console.log("How context looks like? ", context.url);
      const reactComponent = renderToString(
        <Provider store={store}>
          <StaticRouter
            location={req.url}
            context={context}>
            {routes}
          </StaticRouter>
        </Provider>
      );

      if (context.url) {
        // can use the `context.status` that
        // we added in RedirectWithStatus
        redirect(context.status, context.url)
      } else {
        res.status(200).render('index', { reactComponent })
      }
    })
    .catch(function (err) {
      console.log('#Initial Server-side rendering error', err);
    })
}

module.exports = handleRender