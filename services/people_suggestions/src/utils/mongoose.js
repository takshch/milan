const mongoose = require('mongoose');
const config = require('config');

const { url } = config.get('mongoDB') || {};

if (!url) {
  throw new Error('MongoDB database URL is not available in config');
}

const connect = async () => {
  try {
    await mongoose.connect(url);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { connect };
