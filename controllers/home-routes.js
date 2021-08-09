const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Milestone, Goal, Tag } = require('../models');

// Home page
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    }
    res.render('homepage', {
            loggedIn: req.session.loggedIn
        })
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err);
        // });
});

// Login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
    }
    res.render('login', { layout: "blank" });
});

// Signup page
router.get('/signup', (req, res) => {
    res.render('signup', { layout: "blank" })
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json(err);
        // });
});

module.exports = router;