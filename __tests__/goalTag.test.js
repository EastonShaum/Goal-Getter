const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { Goaltag } = require('../models');

test('Check for goaltag validation', async () => {
    const goaltag = {
        goal_id: 1,
        tag_id: 1
    }
    const newgoaltag = Goaltag.build(goaltag);
    const validatedgoaltag = await newgoaltag.validate();
    console.log(validatedgoaltag);
    return expect(validatedgoaltag).toBeDefined();
});

test('Creates and instance of the goaltag model', () => {
    const goaltag = {
        goal_id: 1,
        tag_id: 1
    }
    const newgoaltag = Goaltag.build(goaltag);

    return expect(newgoaltag).toBeInstanceOf(Goaltag)
});