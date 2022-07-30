const validateAuth = (req, res, next) => {
  const { username } = req.body;

  if (username) {
    next();
  } else {
    res.status(401).send({ error: 'unauthorized' });
  }
};

module.exports = { validateAuth };