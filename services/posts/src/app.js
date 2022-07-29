const express = require('express');

const app = express();

app.use('*', (req, res) => {
  console.log({ ...req.params });
  res.status(200).send('POSTS Service called');
});

module.exports = app;