const neo4j = require('../utils/driver');

const CYPHER_CHECK_WANTS_RELATIONSHIP = `
  MATCH (user1: User { username: $usernameFirst })
  MATCH (user2: User { username: $usernameSecond })
  RETURN EXISTS((user1)-[:WANTS_TO_BE_FRIEND_WITH]->(user2))
`;

const CYPHER_DELETE_WANTS_RELATIONSHIP = `
  MATCH (user1: User { username: $usernameFirst })
  MATCH (user2: User { username: $usernameSecond })
  MATCH (user1)-[rel:WANTS_TO_BE_FRIEND_WITH]->(user2)
  DELETE rel
  RETURN TRUE
`;

const CYPHER_MAKE_FRIENDS = `
  MATCH (u1: User { username: $usernameFirst })
  MATCH (u2: User { username: $usernameSecond })
  CREATE (u1)-[r1:HAS_FRIEND]->(u2)
  CREATE (u2)-[r2:HAS_FRIEND]->(u1)
  RETURN TRUE
`;

const acceptFriendRequest = async ({ usernameFirst, usernameSecond }) => {
  const result = await neo4j.writeTransaction(async (txc) => {
    {
      const result = await txc.run(CYPHER_CHECK_WANTS_RELATIONSHIP, { usernameFirst, usernameSecond });
      const record = result.records[0];
      const hasRelationship = record.get(0);

      if (!hasRelationship) {
        return false;
      }
    }

    {
      const result = await txc.run(CYPHER_DELETE_WANTS_RELATIONSHIP, { usernameFirst, usernameSecond });
      const record = result.records[0];
      const hasDeleted = record.get(0);

      if (!hasDeleted) {
        return false;
      }
    }

    {
      const result = await txc.run(CYPHER_MAKE_FRIENDS, { usernameFirst, usernameSecond });
      const record = result.records[0];
      const hasMadeFriends = record.get(0);

      return hasMadeFriends;
    }
  });

  return result;
};

module.exports = { acceptFriendRequest };
