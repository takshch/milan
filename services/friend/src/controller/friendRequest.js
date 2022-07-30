const friendRequestService = require('../services/friendRequest');

const acceptFriendRequest = async (req, res) => {
  const { owner, username } = req.body;

  try {
    const data = { receiverUsername: owner, senderUsername: username };
    const result = await friendRequestService.acceptFriendRequest(data);

    if (result) {
      res.status(200).send();
    } else {
      res.status(404).send();
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

const sendFriendRequest = async (req, res) => {
  const { owner, username } = req.body;

  try {
    const data = { senderUsername: owner, receiverUsername: username };
    const { code } = await friendRequestService.sendFriendRequest(data);
    if (code) {
      return res.status(200).send({ code });
    }
  } catch (e) {
    console.log(e);
  }

  res.status(500).send();
};

module.exports = { acceptFriendRequest, sendFriendRequest };