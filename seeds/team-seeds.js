const { Team } = require('../models');

const teamData = [
    {
        name: 'Fitness Gurus',
        motto: 'Healthy body healthy life',
    },
    {
        name: 'Finance Masters',
        motto: 'Work, save, invest',
    },
    {
        name: 'Self-care Professionals',
        motto: 'Mindfulness will bring happiness'
    },
];

const seedTeams = () => Team.bulkCreate(teamData);

module.exports = seedTeams;