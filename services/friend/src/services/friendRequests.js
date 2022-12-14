const neo4j = require('../utils/driver');

const QUERY_FOR_RECIEVED = `
MATCH (u1: User { username: $username })
MATCH (u2: User)-[:WANTS_TO_BE_FRIEND_WITH]->(u1)
RETURN u2
`;

const fetchReceivedRequests = async (username) => {
  const result = await neo4j.read(QUERY_FOR_RECIEVED, { username });
  let users = [];

  if (result.records.length !== 0) {
    users = result.records.map((record) => {
      const { properties } = record.get(0);
      const { username } = properties;
      return { username };
    });
  }

  return users;
};

const QUERY_FOR_SENDED = `
MATCH (u1: User { username: $username })
MATCH (u1)-[:WANTS_TO_BE_FRIEND_WITH]->(u2)
RETURN u2
`;

const fetchSendedRequests = async (username) => {
  const result = await neo4j.read(QUERY_FOR_SENDED, { username });
  let users = [];

  if (result.records.length !== 0) {
    users = result.records.map((record) => {
      const { properties } = record.get(0);
      const { username } = properties;
      return { username };
    });
  }

  return users;
};

module.exports = { fetchReceivedRequests, fetchSendedRequests };
