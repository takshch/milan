const express = require('express');
const { acceptFriendRequest, sendFriendRequest } = require('../controller/friendRequest');

const router = express.Router();

router.post('/accept', acceptFriendRequest);
router.post('/send', sendFriendRequest);

module.exports = router;