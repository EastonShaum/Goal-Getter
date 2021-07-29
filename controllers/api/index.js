const router = require('express').Router();
const goalRoutes = require('./goal-routes');
const milestoneRoutes = require('./milestone-routes');
const teamRoutes = require('./team-routes');
const userRoutes = require('./user-routes');
const tagRoutes = require('./tag-routes');
const noteRoutes = require('./note-routes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/milestones', milestoneRoutes);
router.use('/goals', goalRoutes);
router.use('/tags', tagRoutes);
router.use('/notes', noteRoutes);

module.exports = router;