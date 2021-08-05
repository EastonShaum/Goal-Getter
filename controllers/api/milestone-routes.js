const router = require('express').Router();
const { Milestone, Goal, User, Team } = require('../../models');

router.get('/', (req, res) => {
    Milestone.findAll()
        .then(dbMilestoneData => res.json(dbMilestoneData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Milestone.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                    model: Goal,
                    attributes: ['title', 'description', 'due_date', 'is_public', 'user_id', 'completed', 'created_at'],
                },
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                    include: {
                        model: Team,
                        attributes: ['']
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