const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { Userteam } = require('../models');

test('Check for userteam validation', async () => {
    const userteam = {
        user_id: 1,
        team_id: 1
    }
    const newuserteam = Userteam.build(userteam);
    const validateduserteam = await newuserteam.validate();
    console.log(validateduserteam);
    return expect(validateduserteam).toBeDefined();
});

test('Creates and instance of the userteam model', () => {
    const userteam = {
        user_id: 1,
        team_id: 1
    }
    const newuserteam = Userteam.build(userteam);

    return expect(newuserteam).toBeInstanceOf(Userteam)
});