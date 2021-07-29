const { Goal } = require('../models');

const goalData = [
    {
        title: 'Get fit',
        description: 'Exercize four days a week for a year',
        due_date: '7/27/2022',
        is_public: true,
        tag_id: 1,
        user_id: 1,
        team_id: 1,
    },
    {
        title: 'Save money',
        description: 'save $200 a month for a year',
        due_date: '7/27/2022',
        is_public: true,
        tag_id: 2,
        user_id: 2,
        team_id: 2,
    },
];

const seedGoals = () => Goal.bulkCreate(goalData);

module.exports = seedGoals;