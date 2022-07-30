const express = require('express');
const { fetchRecievedRequests, fetchSendedRequests } = require('../controller/friendRequests');
const { validateAuth } = require('../validators/auth');

const router = express.Router();

router.post('/received', validateAuth, fetchRecievedRequests);
router.post('/sended', validateAuth, fetchSendedRequests);

module.exports = router;