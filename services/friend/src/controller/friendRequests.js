const friendRequestsService = require('../services/friendRequests');

const fetchRecieved = async (req, res) => {
  const { username } = req.body;

  try {
    const users = await friendRequestsService.fetchReceived(username);
    console.log(users);
    res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

module.exports = { fetchRecieved };
