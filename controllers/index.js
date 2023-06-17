const router = require('express').Router();

const routesAPI = require('./api');
const routesViews = require('./homeRoutes');

router.use('/api', routesAPI);
router.use('/', routesViews);

module.exports = router;