const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Milestone, Goal, Tag } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Goal.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'description',
            'due_date',
            'is_public',
            'user_id',
            'completed',
            'created_at', [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.goal_id = goal.id)"), "total_milestones"],
            [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.status = 'Completed' AND milestone.goal_id = goal.id)"), "complete_milestones"],
        ],
        include: [
            {
                model: Team,
                attributes: ['id', 'name', 'motto'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Milestone,
                order: ["due_date", "DESC"]
            },
            {
                model: User,
                attributes: { exclude: ["password"] },
                include: {
                    model: Team
                }
            }
        ]
    })
    .then(dbGoalData => {
        User.findOne({
            where: {
                id: req.session.user_id
            },
            attributes: { exclude: ["password"] },
            include: {
                model: Team
            }
        })
        .then(dbUserData => {
            const goals = dbGoalData.map(goal => goal.get({ plain: true }));
            const loggedInUser = dbUserData.get({ plain: true });
            console.log(goals, loggedInUser)
            res.render('dashboard-pages/myGoals', { layout: "dashboard", goals, loggedIn: true, loggedInUser })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



router.get('/achievements', withAuth, (req, res) => {
    Goal.findAll({
        where: {
            user_id: req.session.user_id,
            completed: true
        },
        attributes: [
            'id',
            'title',
            'description',
            'due_date',
            'is_public',
            'user_id',
            'completed',
            'created_at', [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.goal_id = goal.id)"), "total_milestones"],
            [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.status = 'Completed' AND milestone.goal_id = goal.id)"), "complete_milestones"],
        ],
        include: [
            {
                model: Team,
                attributes: ['id', 'name', 'motto'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Milestone,
                order: ["due_date", "DESC"]
            },
            {
                model: User,
                attributes: { exclude: ["password"] },
                include: {
                    model: Team
                }
            }
        ]
    })
    .then(dbGoalData => {
        User.findOne({
            where: {
                id: req.session.user_id
            },
            attributes: { exclude: ["password"] },
            include: {
                model: Team
            }
        })
        .then(dbUserData => {
            const goals = dbGoalData.map(goal => goal.get({ plain: true }));
            const loggedInUser = dbUserData.get({ plain: true });
            console.log(goals, loggedInUser)
            res.render('dashboard-pages/achievements', { layout: "dashboard", goals, loggedIn: true, loggedInUser })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

// router.get('/', withAuth, (req, res) => {
//     Promise
//         .all([findAllGoals(req.session.user_id), findUserInfo(99)])
//         .catch(err => {
//             if (err) {
//                 return
//             }
//             // throw err
//             res.status(500).json(err);
//         })
//         .then(responses => {
//             const goals = responses[0].map(goal => goal.get({ plain: true }));
//             const loggedInUser = responses[1].get({ plain: true });
//             console.log(goals, loggedInUser)
//             res.render('dashboard-pages/myGoals', { layout: "dashboard", goals, loggedIn: true, loggedInUser })
//         })
// });

// const findAllGoals = user_id => {
//     return response = new Promise ((resolve, reject) => {
//         Goal.findAll({
//             where: {
//                 // user_id: 1
//                 user_id
//             },
//             attributes: [
//                 'id',
//                 'title',
//                 'description',
//                 'due_date',
//                 'is_public',
//                 'user_id',
//                 'completed',
//                 'created_at', [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.goal_id = goal.id)"), "total_milestones"],
//                 [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.status = 'Completed' AND milestone.goal_id = goal.id)"), "complete_milestones"],
//             ],
//             include: [
//                 {
//                     model: Team,
//                     attributes: ['id', 'name', 'motto'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//                 {
//                     model: Milestone,
//                     order: ["due_date", "DESC"]
//                 },
//                 {
//                     model: User,
//                     attributes: { exclude: ["password"] },
//                     include: {
//                         model: Team
//                     }
//                 }
//             ]
//         })
//         .then (data => {
//             resolve(data)
//         })
//         .catch(err => {
//             reject(err)
//         })
//     })

// const findUserInfo = user_id => {
//     return response = new Promise ((resolve, reject) => {
//         User.findOne({
//             where: {
//                 id: user_id
//             },
//             attributes: { exclude: ["password"] },
//             include: {
//                 model: Team
//             }
//         })
//         .then(data => {
//             resolve(data)
//         })
//         .catch(err => {
//             reject(err)
//         })
//     })
// }


// async function findAllGoals(user_id) {
//     return response = await Goal.findAll({
//         where: {
//             // user_id: 1
//             user_id
//         },
//         attributes: [
//             'id',
//             'title',
//             'description',
//             'due_date',
//             'is_public',
//             'user_id',
//             'completed',
//             'created_at', [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.goal_id = goal.id)"), "total_milestones"],
//             [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.status = 'Completed' AND milestone.goal_id = goal.id)"), "complete_milestones"],
//         ],
//         include: [
//             {
//                 model: Team,
//                 attributes: ['id', 'name', 'motto'],
//                 include: {
//                     model: User,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: Milestone,
//                 order: ["due_date", "DESC"]
//             },
//             {
//                 model: User,
//                 attributes: { exclude: ["password"] },
//                 include: {
//                     model: Team
//                 }
//             }
//         ]
//     })
//     if (response.ok) {
//         console.log(response.get({ plain: true }))
//         return response.get({ plain: true })
//     } 
//         else {
//             alert(response.statusText);
//         }
// }

// async function findUserInfo(user_id) {
//     return response = await User.findOne({
//         where: {
//             id: user_id
//         },
//         attributes: { exclude: ["password"] },
//         include: {
//             model: Team
//         }
//     })

//     if (response.ok) {
//         console.log(response.get({ plain: true }))
//         return response.get({ plain: true })
//     } 
//     else {
//         (response.statusText);
//     }
// }

