const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Milestone, Goal, Tag } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Goal.findAll({
            where: {
                user_id: req.session.user_id,
                completed: true

            },
            attributes: [
                'id',
                'title',
                'description',
                'due_date',
                'is_public',
                'user_id',
                'completed',
                'completed_date',
                'created_at', [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.status = 'Complete' AND milestone.goal_id = goal.id)"), "complete_milestones"],
            ],
            include: [{
                    model: Team,
                    attributes: ['id', 'name', 'motto'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: Milestone,
                    order: ["due_date", "DESC"]
                }
            ]
        })
        .then(dbGoalData => {
            const goals = dbGoalData.map(goal => goal.get({ plain: true }));
            console.log(goals)
            const loggedInUser = { user_id: req.session.user_id }
            res.render('dashboard-pages/achievements', { layout: "dashboard", goals, loggedIn: true, loggedInUser })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;