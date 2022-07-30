const config = require('config');
const neo4j = require('neo4j-driver');

const neo4jConfig = config.get('neo4j');

if (!neo4jConfig) {
  throw new Error('neo4j config is not available');
}

const { url, database: db, username, password } = neo4jConfig;

if (!(url && db && username && password)) {
  throw new Error('Either or all url/database/username/password is missing');
}

const driver = neo4j.driver(url, neo4j.auth.basic(username, password));

const read = (cypher, params = {}, database = db) => {
  const session = driver.session({
    defaultAccessMode: neo4j.session.READ,
    database
  });

  return session.run(cypher, params).then((res) => {
    session.close();
    return res;
  }).catch(e => {
    session.close();
    throw e;
  });
};

const write = (cypher, params = {}, database = db) => {
  const session = driver.session({
    defaultAccessMode: neo4j.session.WRITE,
    database
  });

  return session.run(cypher, params).then((res) => {
    session.close();
    return res;
  }).catch(e => {
    session.close();
    throw e;
  });
};

const writeTransaction = (func, database = db) => {
  const session = driver.session({ database });

  const txcPromise = session.writeTransaction(func);

  return txcPromise.then((res) => {
    return res;
  }).catch(e => {
    throw e;
  }).finally(() => {
    session.close();
  });
};

module.exports = { read, write, writeTransaction };
