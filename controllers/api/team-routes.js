const router = require('express').Router();
const { User, Team, Milestone, Goal, Tag } = require('../../models');

router.get('/', (req, res) => {
    Team.findAll({
            attributes: ['id', 'name', 'motto']
        })
        .then(dbTeamData => res.json(dbTeamData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Team.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(dbTeamData => {
            if (!dbTeamData) {
                res.status(404).json({ message: 'Team not found' });
                return;
            }
            res.json(dbTeamData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    if (req.session) {
        Team.create({
                name: req.body.name,
                motto: req.body.motto
            })
            .then(dbTeamData => { res.json(dbTeamData) })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

router.put('/:id', (req, res) => {
    if (req.session) {
        Team.update({
                where: {
                    id: req.params.id
                }
            })
            .then(dbTeamData => {
                if (!dbTeamData) {
                    res.status(404).json({ message: 'Team not found' });
                    return;
                }
                res.json(dbTeamData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    if (req.session) {
        Team.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbTeamData => {
                if (!dbTeamData) {
                    res.status(404).json({ message: 'Team not found' });
                    return;
                }
                res.json(dbTeamData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

module.exports = router;