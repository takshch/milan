# Endpoints

## Users
- /users [CREATE]
- /users/:user_id [GET, UPDATE, DELETE]

## Friend Request
- /friend_request/send [POST]
- /friend_request/accept [POST]
- /friend_requests/received [GET]
- /friend_requests/sended [GET]
- /friends [GET]

## People Suggestion
- /people_suggestions?lat=lat&long=long&distance=dist [GET]

## Posts
- /posts [CREATE, GET]
- /posts/:postsId [GET]
- /posts/:postId/reactions [CREATE, GET]
- /posts/:postId/comments [CREATE, GET]
- /posts/:postId/comments/:commentId [GET]

## Feed
- /feed [GET]
- /feed/?limit=limit&offset=offset [GET]
