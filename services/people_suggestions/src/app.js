const express = require('express');
const router = require('./routes/index');
const initialize = require('./initialize');

const app = express();

initialize(app);

app.use(router);

module.exports = app;