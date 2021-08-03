const router = require('express').Router();
const { Tag, Team, User, Userteam, Goal, Goaltag, Milestone, Note } = require('../../models');

router.get('/', (req, res) => {
    Goal.findAll({
            attributes: ['id', 'title', 'description', 'due_date', 'is_public', 'completed', 'created_at'],
            include: [{
                    model: User,
                    attributes: ['username', 'first_name', 'last_name']
                },
                {
                    model: Tag,
                    attributes: ['name'],
                    through: Goaltag,
                    as: 'tags'
                }
            ]
        })
        .then(dbGoalData => res.json(dbGoalData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Goal.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'description', 'due_date', 'is_public', 'completed', 'created_at'],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Tag,
                    attributes: ['name'],
                    through: Goaltag,
                    as: 'tags'
                },
                {
                    model: Milestone,
                    attributes: ['title', 'description', 'due_date'],
                    as: 'milestones',
                    include: [{
                        model: Note,
                        attributes: ['text']
                    }]
                },
                {
                    model: Note,
                    attributes: ['text']
                }
            ]
        })
        .then(dbGoalData => {
            if (!dbGoalData) {
                res.status(404).json({ message: 'Goal not found' });
                return;
            }
            res.json(dbGoalData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    if (req.session) {
        Goal.create({
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
                is_public: req.body.is_public,
                user_id: req.session.user_id,
                completed: req.body.completed
            })
            .then(dbGoalData => res.json(dbGoalData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

router.put('/:id', (req, res) => {
    if (req.session) {
        Goal.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(dbGoalData => {
                if (!dbGoalData[0]) {
                    res.status(404).json({ message: 'Goal not found' });
                    return;
                }
                res.json(dbGoalData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

router.delete(':/id', (req, res) => {
    if (req.session) {
        Goal.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbGoalData => {
                if (!dbGoalData) {
                    res.status(404).json({ message: 'Goal not found' });
                    return;
                }
                res.json(dbGoalData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});


module.exports = router;