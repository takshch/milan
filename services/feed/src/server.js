const http = require('http');
const config = require('config');
const app = require('./app');

const port = config.get('port');

if (!port) {
  throw new Error('port is not available in config');
}

const server = http.createServer(app);

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

function onError(e) {
  console.log(e);
}

function onListening() {
  console.log(`Server started listening on PORT ${port}`)
}