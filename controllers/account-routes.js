const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Milestone, Goal, Tag, Userteam } = require('../models');
const withAuth = require('../utils/auth');

// Get account details to be displayed on the /account page
router.get('/', withAuth, (req, res) => {
    User.findOne({
            where: {
                id: req.session.user_id
            },
            attributes: [
                "id",
                "username",
                "first_name",
                "last_name",
                "email",
                "created_at",
                "updated_at",
                [sequelize.literal("(SELECT COUNT(*) FROM goal WHERE goal.user_id = user.id)"), "total_goals"],
                [sequelize.literal("(SELECT COUNT(*) FROM goal WHERE goal.user_id = user.id AND goal.completed = true)"), "complete_goals"],
                [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.user_id = user.id)"), "total_milestones"]
            ],
            include: [
                {
                    model: Team,
                    attributes: ['name', 'motto'],
                    through: Userteam,
                    as: 'teams',
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'username', 'first_name', 'last_name'],
                            as: 'users'
                        }
                    ]
                }
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const user = dbUserData.get({ plain: true });
            console.log(user)
            const loggedInUser = req.session.user_id;
            res.render('dashboard-pages/account-management', { layout: "dashboard", user, loggedIn: true, loggedInUser });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;