const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { User } = require('../models');

test('Check for user validation', async() => {
    const user = {
        username: 'BezosJeff',
        first_name: 'Jeff',
        last_name: 'Bezos',
        email: 'jeff@bezos.com',
        password: '1WentToSpace!'
    }
    const newUser = User.build(user);
    const validatedUser = await newUser.validate();
    console.log(validatedUser);
    return expect(validatedUser).toBeDefined();
});

test('Creates and instance of the user model', () => {
    const user = {
        username: 'BezosJeff',
        first_name: 'Jeff',
        last_name: 'Bezos',
        email: 'jeff@bezos.com',
        password: '1WentToSpace!'
    }
    const newUser = User.build(user);

    return expect(newUser).toBeInstanceOf(User)
})