const { Goal } = require('../models');

const goalData = [{
        title: 'Get fit',
        description: 'Exercise four days a week for a year',
        due_date: '7/27/2022',
        is_public: true,
        completed: false,
        user_id: 1
    },
    {
        title: 'Save money',
        description: 'save $200 a month for a year',
        due_date: '7/27/2022',
        is_public: true,
        completed: true,
        user_id: 2
    },
];

const seedGoals = () => Goal.bulkCreate(goalData);

module.exports = seedGoals;