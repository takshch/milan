const morgan = require("morgan");
const { queryParser } = require('express-query-parser');
const { connect } = require('./utils/mongoose');

const initialize = (app) => {
  // setup logging
  app.use(morgan('combined'));

  app.use(queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true
  }));

  // connect with database
  (async () => {
    await connect();
  })();
};

module.exports = initialize;