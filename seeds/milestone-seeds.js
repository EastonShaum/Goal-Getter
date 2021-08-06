const { Milestone } = require('../models');

const milestoneData = [
    {
        title: 'six month mark',
        description: 'working out for six months',
        due_date: '1/27/2022',
        is_public: true,
        goal_id: 1,
        user_id: 1,
        status: "To Do"
    },
    {
        title: 'Improve 40 Yard Dash Time',
        description: 'Drop 2 seconds in my current 40 yard dash time',
        due_date: '1/31/2022',
        is_public: true,
        goal_id: 1,
        user_id: 1,
        status: "To Do"
    },
    {
        title: 'Stop drinking soda',
        description: 'Go 30 days without drinking soda',
        due_date: '9/1/2021',
        is_public: true,
        goal_id: 1,
        user_id: 1,
        status: "In Progress"
    },
    {
        title: 'Get Gym Membership',
        description: 'Buy Gym Membership',
        due_date: '8/31/2021',
        is_public: true,
        goal_id: 1,
        user_id: 1,
        status: "Completed"
    },
    {
        title: 'saved $1,000',
        description: null,
        due_date: '12/27/2021',
        is_public: true,
        goal_id: 2,
        goal_id: 1,
        status: "To Do"
    },
];

const seedMilestones = () => Milestone.bulkCreate(milestoneData);

module.exports = seedMilestones;