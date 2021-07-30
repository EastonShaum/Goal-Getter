const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { Goal } = require('../models');

test('Check for goal validation', async () => {
    const goal = {
        title: 'Go to Space',
        description: 'Using a rocket I will make it to space',
        due_date: '10/31/2021',
        is_public: true,
        user_id: 1
    }
    const newgoal = Goal.build(goal);
    const validatedgoal = await newgoal.validate();
    console.log(validatedgoal);
    return expect(validatedgoal).toBeDefined();
});

test('Creates and instance of the goal model', () => {
    const goal = {
        title: 'Go to Space',
        description: 'Using a rocket I will make it to space',
        due_date: '10/31/2021',
        is_public: true,
        user_id: 1
    }
    const newgoal = Goal.build(goal);

    return expect(newgoal).toBeInstanceOf(Goal)
});