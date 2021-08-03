const { Goal } = require('../models');

const goalData = [{
        title: 'Get fit',
        description: 'Exercize four days a week for a year',
        due_date: '7/27/2022',
        is_public: true,
        user_id: 1,
        completed: true,
    },
    {
        title: 'Save money',
        description: 'save $200 a month for a year',
        due_date: '7/27/2022',
        is_public: true,
        user_id: 2,
        completed: false,
    },
];

const seedGoals = () => Goal.bulkCreate(goalData);

module.exports = seedGoals;