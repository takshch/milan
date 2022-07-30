const validateAuth = (req, res, next) => {
  const { owner } = req.body;

  if (owner) {
    next();
  } else {
    res.status(401).send({ error: 'unauthorized' });
  }
};

module.exports = { validateAuth };