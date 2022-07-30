const express = require('express');
const { acceptFriendRequest, sendFriendRequest } = require('../controller/friendRequest');
const { validateAuth } = require('../validators/auth');

const router = express.Router();

router.post('/accept', validateAuth, acceptFriendRequest);
router.post('/send', validateAuth, sendFriendRequest);

module.exports = router;