const router = require('express').Router();
// Importing all of the API routes from /api/index.js 
const apiRoutes = require('./api');

// prefix '/api' in db queries
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>404 Error: Try again!</h1>');
});

module.exports = router;