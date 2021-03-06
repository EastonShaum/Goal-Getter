const router = require('express').Router();
const { Milestone, Goal, User, Userteam ,Team } = require('../../models');

// GET ALL MILESTONES
router.get('/', (req, res) => {
    Milestone.findAll()
        .then(dbMilestoneData => res.json(dbMilestoneData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET ONE MILESTONE
router.get('/:id', (req, res) => {
    Milestone.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                    model: Goal,
                    attributes: ['title', 'description', 'due_date', 'is_public', 'user_id',
                        'completed_date', 'completed', 'created_at'
                    ],
                },
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                    include: {
                        model: Team,
                        through: Userteam,
                        as: "teams"
                    }          
                }
            ]
        })
        .then(dbMilestoneData => {
            if (!dbMilestoneData) {
                res.status(404).json({ message: 'Milestone not found' });
                return;
            }
            res.json(dbMilestoneData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE MILESTONE
router.post('/', (req, res) => {
    if (req.session) {
        console.log(req.body);
        Milestone.create({
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
                is_public: req.body.is_public,
                goal_id: req.body.goal_id,
                user_id: req.session.user_id
            })
            .then(dbMilestoneData => res.json(dbMilestoneData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// UPDTE MILESTONE
router.put('/:id', (req, res) => {
    if (req.session) {
        Milestone.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(dbMilestoneData => {
                if (!dbMilestoneData[0]) {
                    res.status(404).json({ message: 'Milestone not found' });
                    return;
                }
                res.json(dbMilestoneData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// DELETE MILESTONE
router.delete('/:id', (req, res) => {
    if (req.session) {
        Milestone.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbMilestoneData => {
                if (!dbMilestoneData) {
                    res.status(404).json({ message: 'Milestone not found' });
                    return;
                }
                res.json(dbMilestoneData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

module.exports = router;