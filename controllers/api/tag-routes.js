const router = require('express').Router();
const { Tag } = require('../../models');

// GET ALL TAGS
router.get('/', (req, res) => {
    Tag.findAll()
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE NEW TAG
router.post('/', (req, res) => {
    Tag.create({
            name: req.body.name
        })
        .then(dbTagData => res.json(dbTagData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// DELETE TAG
router.delete('/:id', (req, res) => {
    Tag.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbTagData => {
            if (!dbTagData) {
                res.status(404).json({ message: 'Tag not found' });
                return;
            }
            res.json(dbTagData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;