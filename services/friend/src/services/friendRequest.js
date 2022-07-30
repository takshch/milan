const neo4j = require('../utils/driver');

const CYPHER_CHECK_WANTS_RELATIONSHIP = `
  MATCH (sender: User { username: $senderUsername })
  MATCH (receiver: User { username: $receiverUsername })
  RETURN EXISTS((sender)-[:WANTS_TO_BE_FRIEND_WITH]->(receiver))
`;

const CYPHER_DELETE_WANTS_RELATIONSHIP = `
  MATCH (sender: User { username: $senderUsername })
  MATCH (receiver: User { username: $receiverUsername })
  MATCH (sender)-[rel:WANTS_TO_BE_FRIEND_WITH]->(receiver)
  DELETE rel
  RETURN TRUE
`;

const CYPHER_MAKE_FRIENDS = `
  MATCH (sender: User { username: $senderUsername })
  MATCH (receiver: User { username: $receiverUsername })
  CREATE (sender)-[r1:HAS_FRIEND]->(receiver)
  CREATE (receiver)-[r2:HAS_FRIEND]->(sender)
  RETURN TRUE
`;

const acceptFriendRequest = async ({ receiverUsername, senderUsername }) => {
  const result = await neo4j.writeTransaction(async (txc) => {
    const parameters = { receiverUsername, senderUsername };

    {
      const result = await txc.run(CYPHER_CHECK_WANTS_RELATIONSHIP, parameters);
      const record = result.records[0];
      const hasRelationship = record.get(0);

      if (!hasRelationship) {
        return false;
      }
    }

    {
      const parameters = { receiverUsername, senderUsername };
      const result = await txc.run(CYPHER_DELETE_WANTS_RELATIONSHIP, parameters);
      const record = result.records[0];
      const hasDeleted = record.get(0);

      if (!hasDeleted) {
        return false;
      }
    }

    {
      const result = await txc.run(CYPHER_MAKE_FRIENDS, parameters);
      const record = result.records[0];
      const hasMadeFriends = record.get(0);

      return hasMadeFriends;
    }
  });

  return result;
};

const CYPHER_CHECK_FRIENDSHIP = `
MATCH (sender: User { username: $senderUsername })
MATCH (receiver: User { username: $receiverUsername })
RETURN (
  EXISTS((sender)-[:HAS_FRIEND]->(receiver))
  AND
  EXISTS((receiver)-[:HAS_FRIEND]->(sender))
)
`;

const CYPHER_MAKE_FRIEND_REQUEST = `
  MATCH (sender: User { username: $senderUsername })
  MATCH (receiver: User { username: $receiverUsername })
  MERGE (sender)-[:WANTS_TO_BE_FRIEND_WITH]->(receiver)
  RETURN TRUE
`;

const sendFriendRequest = async ({ senderUsername, receiverUsername }) => {
  const result = await neo4j.writeTransaction(async (txc) => {
    const parameters = { senderUsername, receiverUsername };

    {
      const result = await txc.run(CYPHER_CHECK_FRIENDSHIP, parameters);
      const record = result.records[0];
      const hasFriendship = record.get(0);

      if (hasFriendship) {
        return { code: 'already-friends' }
      }
    }

    {
      const result = await txc.run(CYPHER_CHECK_WANTS_RELATIONSHIP, parameters);

      const record = result.records[0];
      const hasRelationship = record.get(0);

      if (hasRelationship) {
        return { code: 'already-sent-friend-request' };
      }
    }

    {
      const result = await txc.run(CYPHER_MAKE_FRIEND_REQUEST, parameters);
      const record = result.records[0];
      const status = record.get(0);

      console.log(result, record, status);

      let msg;

      if (status) {
        msg = { code: 'successfull' };
      } else {
        msg = { code: 'error' };
      }

      return msg;
    }
  });

  return result;
};

module.exports = { acceptFriendRequest, sendFriendRequest };
