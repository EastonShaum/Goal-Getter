const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { Milestone } = require('../models');

test('Check for milestone validation', async () => {
    const milestone = {
        title: 'Start the engines',
        description: 'Press the button to burn a lot of fuel',
        due_date: '10/31/2021',
        is_public: true,
        goal_id: '1',
        user_id: '1'
    }
    const newmilestone = Milestone.build(milestone);
    const validatedmilestone = await newmilestone.validate();
    console.log(validatedmilestone);
    return expect(validatedmilestone).toBeDefined();
});

test('Creates and instance of the milestone model', () => {
    const milestone = {
        title: 'Start the engines',
        description: 'Press the button to burn a lot of fuel',
        due_date: '10/31/2021',
        is_public: true,
        goal_id: '1',
        user_id: '1'
    }
    const newmilestone = Milestone.build(milestone);

    return expect(newmilestone).toBeInstanceOf(Milestone)
});