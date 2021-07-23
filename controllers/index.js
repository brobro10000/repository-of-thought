const router = require('express').Router();
const loginRoutes = require('./login-routes')
const indexRoutes = require('./index-routes')
const dashboardRoutes = require('./dashboard-routes')
const apiRoutes = require('./api/');

router.use('/api', apiRoutes);
router.use('/login', loginRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/', indexRoutes);

module.exports = router;
