const router = require('express').Router();

const indexRoutes = require('./index-routes')
const apiRoutes = require('./api/');

router.use('/', indexRoutes);
router.use('/api', apiRoutes);

module.exports = router;
