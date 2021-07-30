const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { Team } = require('../models');

test('Check for team validation', async () => {
    const team = {
        name: 'Jeffys Team',
        motto: 'We sacrifice our lives to get Jeffery to space!'
    }
    const newteam = Team.build(team);
    const validatedteam = await newteam.validate();
    console.log(validatedteam);
    return expect(validatedteam).toBeDefined();
});

test('Creates and instance of the team model', () => {
    const team = {
        name: 'Jeffys Team',
        motto: 'We sacrifice our lives to get Jeffery to space!'
    }
    const newteam = Team.build(team);

    return expect(newteam).toBeInstanceOf(Team)
});