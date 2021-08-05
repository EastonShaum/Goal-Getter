const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const goalRoutes = require('./goal-routes.js');
const aboutUsRoutes = require('./about-us-routes.js');
const contactUsRoutes = require('./contact-us-routes.js');
const achievementRoutes = require('./achievements-routes')

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/goal', goalRoutes);
router.use('/about-us', aboutUsRoutes);
router.use('/api', apiRoutes);
router.use('/contact-us', contactUsRoutes)
router.use('/achievements', achievementRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;