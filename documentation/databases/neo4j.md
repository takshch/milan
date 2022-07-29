# Neo4j Data Representation

# Nodes Properties

- User
  - username
  - email
  - firstName
  - lastName
  - geolocation
- Post
  - images
  - videos
- Comment
  - text

# Relationships

- (u: User)-[:HAS_POST]->(p: POST)
- (u1: User)-[:HAS_FRIEND]->(u2: User)
- (u1: User)-[:WANTS_TO_BE_FRIEND_WITH]->(u2: User)
- (p: Post)-[:HAS_COMMENT]->(c: Comment)
- (c: Comment)-[:IS_COMMENTED_BY]->(u: User)
- (u: User)-[:HAS_REACTED_ON { reactionType: ''}]->(p: Post)
