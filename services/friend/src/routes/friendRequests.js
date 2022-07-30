const express = require('express');
const { fetchRecieved } = require('../controller/friendRequests');
const { validateAuth } = require('../validators/auth');

const router = express.Router();

router.post('/received', validateAuth, fetchRecieved);

module.exports = router;