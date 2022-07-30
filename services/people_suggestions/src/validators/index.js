const Joi = require('joi');

const OPTIONS = {
  errors: {
    wrap: { label: '' }
  }
};

const validateGetPeopleSuggestions = async (req, res, next) => {
  const schema = Joi.object().strict().keys({
    lat: Joi.number().min(-90).max(90).required(),
    long: Joi.number().min(-180).max(180).required(),
    distance: Joi.number().required()
  });

  try {
    await schema.validateAsync(req.query, OPTIONS);
    next();
  } catch (e) {
    const { details } = e;
    const { message } = details[0];
    res.status(400).send({ error: message });
  }
};

module.exports = { validateGetPeopleSuggestions };