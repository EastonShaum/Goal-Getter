const router = require('express').Router();
const goalRoutes = require('./goal-routes');
const milestoneRoutes = require('./milestone-routes');
const teamRoutes = require('./team-routes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/milestones', milestoneRoutes);
router.use('/goals', goalRoutes);

module.exports = router;