const express = require('express');
const { acceptFriendRequest } = require('../controller/friendRequest');

const router = express.Router();

router.post('/accept', acceptFriendRequest);

module.exports = router;