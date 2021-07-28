const router = require('express').Router();
const { Team, User, Milestone, Tag, Goal } = require('../../models');

router.get('/', (req, res) => {
    Goal.findAll()
        .then(dbGoalData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Goal.findOne({
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
});

router.post('/', (req, res) => {
    if (req.session) {
        Goal.create({
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
                is_public: req.body.is_public,
                tag_id: req.body.tag_id,
                user_id: req.session.user_id
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