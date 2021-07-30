const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Milestone, Goal, Tag } = require('../models');

router.get('/', (req, res) => {
    Goal.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['title', 'description', 'due_date', 'is_public', 'tag_id', 'user_id', 'team_id', 'created_at'],
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
                    attributes: ['id', 'title', 'description', 'due_date', 'is_public', 'goal_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbGoalData => {
            const goals = dbGoalData.map(goal => goal.get({ plain: true }));
            res.render('dashboard', { goals, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/', (req, res) => {
    Milestone.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'description', 'due_date', 'is_public', 'goal_id', 'user_id'],
            include: [{
                    model: Goal,
                    attributes: ['title', 'description', 'due_date', 'is_public', 'tag_id', 'user_id', 'team_id', 'created_at'],
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

router.get('/edit/:id', (req, res) => {
    Goal.findByPk(req.params.id, {
            attributes: ['title', 'description', 'due_date', 'is_public', 'tag_id', 'user_id', 'team_id', 'created_at'],
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
                    attributes: ['id', 'title', 'description', 'due_date', 'is_public', 'goal_id', 'user_id'],
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

router.get('/edit/:id', (req, res) => {
    Milestone.findByPk(req.body.id, {
            attributes: ['id', 'title', 'description', 'due_date', 'is_public', 'goal_id', 'user_id'],
            include: [{
                    model: Goal,
                    attributes: ['title', 'description', 'due_date', 'is_public', 'tag_id', 'user_id', 'team_id', 'created_at'],
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