const { Goaltag } = require('../models');

const goaltagData = [
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

const seedGoaltags = () => Goaltag.bulkCreate(goaltagData);

module.exports = seedGoaltags;