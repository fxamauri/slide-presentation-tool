const express = require('express');
const routes  = require('./routes');
const authorizationMiddleware = require('./authorizationMiddlware');

const app = express();

const generatedSecretKey = Math.random().toString(8).substr(15);
// global auth middlware
// app.use(authorizationMiddleware(generatedSecretKey));

app.use(routes);

app.listen(3000, () => {
  console.log('SECRET KEY: ', generatedSecretKey)
});
