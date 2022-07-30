const friendRequestsService = require('../services/friendRequests');

const fetchRecievedRequests = async (req, res) => {
  const { owner } = req.body;

  try {
    const users = await friendRequestsService.fetchReceivedRequests(owner);
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

const fetchSendedRequests = async (req, res) => {
  const { owner } = req.body;

  try {
    const users = await friendRequestsService.fetchSendedRequests(owner);
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

module.exports = { fetchRecievedRequests, fetchSendedRequests };
