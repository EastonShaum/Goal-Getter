const router = require('express').Router();
const { User, Team, Milestone, Goal, Tag } = require('../../models');

// not in use, but gets all teams
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

// not in use, but gets specific team
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

// not in use, but posts team data
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

// not in use, but updates specific team data
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

// not in use, but deletes specific team
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