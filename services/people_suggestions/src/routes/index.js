const express = require('express');
const { getPeopleSuggestions } = require('../controllers/index');
const { validateGetPeopleSuggestions } = require('../validators/index');

const router = express.Router();

router.get('/', validateGetPeopleSuggestions, getPeopleSuggestions);

// Handle 404 NOT Found
router.use('*', (_, res) => {
  res.status(404).send();
});

module.exports = router;