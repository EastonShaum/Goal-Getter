const { Milestone } = require('../models');

const milestoneData = [
    {
        title: 'six month mark',
        description: 'working out for six months',
        due_date: '1/27/2022',
        is_public: true,
        goal_id: 1,
    },
    {
        title: 'saved $1,000',
        description: null,
        due_date: '12/27/2021',
        is_public: true,
        goal_id: 2,
    },
];

const seedMilestones = () => Milestone.bulkCreate(milestoneData);

module.exports = seedMilestones;