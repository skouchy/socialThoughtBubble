const router = require('express').Router();
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const apiRoutes = require('./api');

// add prefix of '/api' to all api routes imported from 'api' directory
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>404 Error: Try again!</h1>');
});

module.exports = router;