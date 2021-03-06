const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Milestone, Goal, Tag } = require('../models');
const withAuth = require('../utils/auth');

// Main dashboard page
router.get('/', withAuth, (req, res) => {
    Goal.findAll({
            where: {
                user_id: req.session.user_id,
                completed: false
            },
            attributes: [
                'id',
                'title',
                'description',
                'due_date',
                'is_public',
                'user_id',
                'completed_date',
                'completed',
                'created_at', [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.goal_id = goal.id)"), "total_milestones"],
                [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.status = 'Complete' AND milestone.goal_id = goal.id)"), "complete_milestones"],
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
            res.render('dashboard-pages/myGoals', { layout: "dashboard", goals, loggedIn: true, loggedInUser })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Not in use at the moment, but a little too scared to just start deleting things right before submitting.
router.get('/', withAuth, (req, res) => {
    Milestone.findAll({
            where: {
                user_id: req.session.user_id,
                completed: false
            },
            attributes: ['id', 'title', 'description', 'due_date', 'is_public', 'goal_id', 'user_id'],
            include: [{
                    model: Goal,
                    attributes: ['title', 'description', 'due_date', 'is_public', 'tag_id', 'user_id',
                        'completed_date', 'completed', 'created_at'
                    ],
                    include: {
                        model: Team,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'first_name', 'last_name', 'email', 'team_id']
                }
            ]
        })
        .then(dbMilestoneData => {
            const milestones = dbMilestoneData.map(goal => goal.get({ plain: true }));
            res.render('dashboard', { milestones, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Not in use at the moment, but a little too scared to just start deleting things right before submitting.
// Edit Goal page
router.get('/edit/:id', withAuth, (req, res) => {
    Goal.findByPk(req.params.id, {
            attributes: ['title', 'description', 'due_date', 'is_public', 'tag_id', 'user_id',
                'completed_date', 'completed', 'created_at'
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
                    attributes: ['id', 'title', 'description', 'due_date', 'is_public', 'goal_id', 'user_id', 'status'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbGoalData => {
            if (dbGoalData) {
                const goal = dbGoalData.get({ plain: true });

                res.render('edit-goal', {
                    goal,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Not in use at the moment, but a little too scared to just start deleting things right before submitting.
// Edit milestone page
router.get('/edit/:id', withAuth, (req, res) => {
    Milestone.findByPk(req.body.id, {
            attributes: ['id', 'title', 'description', 'due_date', 'is_public', 'goal_id', 'user_id', 'status'],
            include: [{
                    model: Goal,
                    attributes: ['title', 'description', 'due_date', 'is_public', 'tag_id', 'user_id',
                        'completed_date', 'completed', 'created_at'
                    ],
                    include: {
                        model: Team,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['id', 'username', 'first_name', 'last_name', 'email', 'team_id']
                }
            ]
        })
        .then(dbMilestoneData => {
            if (dbMilestoneData) {
                const milestone = dbMilestoneData.get({ plain: true });

                res.render('edit-milestone', {
                    milestone,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;