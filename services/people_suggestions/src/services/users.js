const User = require('../models/User');

const findUsersInLocation = async ({ lat, long, distance }) => {
  const coordinates = [long, lat];

  const data = {
    $geometry: { type: 'Point', coordinates },
    $maxDistance: distance
  };

  let users = await User.find({
    location: {
      $near: data
    },
  });

  users = users.map(({ location, username }) => {
    const { coordinates } = location || {};
    return { coordinates, username };
  });

  return users;
};

module.exports = { findUsersInLocation };