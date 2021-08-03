const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Milestone, Goal, Tag } = require('../models');
const withAuth = require('../utils/auth');

// GET SINGLE GOAL AND MILESTONES
router.get("/:id", withAuth, (req, res) => {
    Goal.findOne({
        where: {
            user_id: 1,
            id: req.params.id
        },
        attributes: [
            "id",
            "created_at",
            "updated_at",
            "title",
            "description",
            "due_date",
            "is_public",
            "user_id",
            "completed",
            [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.goal_id = goal.id)"), "total_milestones"],
            [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.status = 'Completed' AND milestone.goal_id = goal.id)"), "complete_milestones"],
        ],
        include: [
            {
                model: Milestone,
            }
        ],
        plain: true
    })
    .then(data => {
        const goalData = data.get({ plain: true })
        console.log(goalData);
        const loggedInUser = {user_id: req.session.user_id}
        console.log(loggedInData)
        if(!data){
            res.status(404).json({ message: "No goals found with provided id"});
            return;
        }
        res.render("dashboard-pages/single-goal", { 
            layout: "dashboard",
            goalData,
            loggedInUser,
            loggedIn: true
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
})

module.exports = router;