const { Userteam } = require('../models');

const userteamData = [
    {
        user_id: 1,
        team_id: 1,
    },
    {
        user_id: 1,
        team_id: 2
    },
    {
        user_id: 2,
        team_id: 2,
    },
    {
        user_id: 3,
        team_id: 3,
    },
    {
        user_id: 4,
        team_id: 1
    }
];

const seedUserteams = () => Userteam.bulkCreate(userteamData);

module.exports = seedUserteams;