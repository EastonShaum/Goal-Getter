const router = require('express').Router();
const { Note } = require('../../models');

// GET ALL NOTES
router.get('/', (req, res) => {
    Note.findAll({
            attributes: ['id', 'text', 'goal_id', 'milestone_id']
        })
        .then(dbNoteData => res.json(dbNoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// FIND ONE NOTE
router.get('/', (req, res) => {
    Note.findAll({
        where: {

        },
            attributes: ['id', 'text', 'goal_id', 'milestone_id']
        })
        .then(dbNoteData => res.json(dbNoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE NOTE
router.post('/', (req, res) => {
    Note.create({
            text: req.body.text,
            goal_id: req.body.goal_id,
            milestone_id: req.body.milestone_id
        })
        .then(dbNoteData => res.json(dbNoteData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// UPDATE NOTE
router.put('/:id', (req, res) => {
    if (req.session) {
        Note.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(dbNoteData => {
                if (!dbNoteData[0]) {
                    res.status(404).json({ message: 'Note not found' });
                    return;
                }
                res.json(dbNoteData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

// DELETE NOTE
router.delete('/:id', (req, res) => {
    Note.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbNoteData => {
            if (!dbNoteData) {
                res.status(404).json({ message: 'Note not found' });
                return;
            }
            res.json(dbNoteData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;