require('babel-register')({
  "presets":["es2015", "react", "stage-2"]
});

import app from './server';

app.listen(3001, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('API Server is listening on http://localhost:3001');
});

