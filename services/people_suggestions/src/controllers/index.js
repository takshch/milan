const { findUsersInLocation } = require('../services/users');

const getPeopleSuggestions = async (req, res) => {
  const { lat, long, distance } = req.query;

  try {
    const users = await findUsersInLocation({ lat, long, distance });
    return res.status(200).send(users);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

module.exports = { getPeopleSuggestions };