const router = require('express').Router();
const { Goal, Milestone, Team, User } = require('../../models');

// Get all users
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Get specific user by id
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Goal,
                    attributes: ['title', 'description', 'due_date', 'is_public', 'tag_id', 'user_id', 'created_at'],
                    include: {
                        model: Milestone,
                        attributes: ['title', 'description', 'due_date', 'is_publlic', 'goal_id', 'user_id']
                    }
                },
                {
                    model: Team,
                    attributes: [''],
                    include: {
                        model: User,
                        attributes: ['first_name', 'last_name']
                    }
                }
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', authPlaceHolder, (req, res) => {
    User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.first_name = dbUserData.first_name;
                req.session.last_name = dbUserData.last_name;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
});

router.put('/:id', authPlaceHolder, (req, res) => {
    User.update(req.body, {
            inidividualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', authPlaceHolder, (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Invalid password' });
                return;
            }

            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.first_name = dbUserData.first_name;
                req.session.last_name = dbUserData.last_name;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'Logged in!' });
            })
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;