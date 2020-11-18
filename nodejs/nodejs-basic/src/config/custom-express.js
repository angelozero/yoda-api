require('marko/node-require').install();
require('marko/express')

const express = require('express');
const routes = require('../app/routes/routes')
const bodyParsers = require('body-parser')
const app = express();

app.use('/static', express.static('src/app/public'));


app.use(bodyParsers.urlencoded({
  extended: true
}))

routes(app);

app.use(function (req, res, next) {
  return res.status(404).marko( require('../app/views/books/errors/404.marko'));
})

app.use(function (req, res, next) {
  return res.status(500).marko( require('../app/views/books/errors/500.marko'));
})

module.exports = app;