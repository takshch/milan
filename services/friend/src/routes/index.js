const express = require('express');
const friendRequestRouter = require('./friendRequest');
const friendRequestsRouter = require('./friendRequests');

const router = express.Router();

router.use('/friend_request', friendRequestRouter);

router.use('/friend_requests', friendRequestsRouter);

// Handles 404 NOT FOUND
router.use('*', (_, res) => {
  res.status(404).send('Not Found');
});

module.exports = router;