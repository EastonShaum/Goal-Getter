const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Team, Note, Milestone, Goal, Tag } = require('../models');
const withAuth = require('../utils/auth');

// GET SINGLE GOAL AND MILESTONES
router.get("/:id", withAuth, (req, res) => {
    Goal.findOne({
        where: {
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
            "completed_date",
            [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.goal_id = goal.id)"), "total_milestones"],
            [sequelize.literal("(SELECT COUNT(*) FROM milestone WHERE milestone.status = 'Complete' AND milestone.goal_id = goal.id)"), "complete_milestones"],
        ],
        include: [
            {
                model: Milestone,
            }, 
            {
                model: Note
            }
        ],
        plain: true
    })
    .then(data => {
        const goalData = data.get({ plain: true })

        const today = new Date()
        goalData.today = today

        if(goalData.complete_milestones === goalData.total_milestones) {
            goalData.can_complete = true
        } else {
            goalData.can_complete = false
        }
        if(req.session.user_id === goalData.user_id) {
            goalData.is_author = true
        } else {
            goalData.is_author = false
        }

        console.log(goalData);

        const loggedInUser = {user_id: req.session.user_id}
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