import axios from 'axios';
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import routes from './src/routes';
import {renderToString} from 'react-dom/server';

function handleRender(req, res){
  axios.get('http://localhost:3001/clients')
    .then(function(response){
        // STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTs AND DEFINE WHAT TO DO WITH THEM
        const context = {};
        console.log("How context looks like? ", context.url);
            const reactComponent = renderToString(
                <StaticRouter
                  location={req.url}
                  context={context}>
                  {routes}
                </StaticRouter>
            );

            if (context.url) {
              // can use the `context.status` that
              // we added in RedirectWithStatus
              redirect(context.status, context.url)
            } else {
              res.status(200).render('index', { reactComponent })
            }
      })
      .catch(function(err){
        console.log('#Initial Server-side rendering error', err);
      })
    }

module.exports = handleRender