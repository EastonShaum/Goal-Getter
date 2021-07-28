const router = require('express').Router();
const goalRoutes = require('./goal-routes');
const milestoneRoutes = require('./milestone-routes');
const teamRoutes = require('./team-routes');
const userRoutes = require('./user-routes');
const tagRoutes = require('./tag-routes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/milestones', milestoneRoutes);
router.use('/goals', goalRoutes);
router.use('/tags', tagRoutes);

module.exports = router;