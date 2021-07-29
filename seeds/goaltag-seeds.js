const { GoalTag } = require('../models');

const goalTagData = [
    {
        goal_id: 1,
        tag_id: 1,
    },
    {
        goal_id: 2,
        tag_id: 2,
    },
    {
        goal_id: 2,
        tag_id: 3,
    },
];

const seedGoalTags = () => GoalTag.bulkCreate(goalTagData);

module.exports = seedGoalTags;