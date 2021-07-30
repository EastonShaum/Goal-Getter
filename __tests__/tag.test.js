const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { Tag } = require('../models');

test('Check for tag validation', async () => {
    const tag = {
        name: 'Space Exploration'
    }
    const newtag = Tag.build(tag);
    const validatedtag = await newtag.validate();
    console.log(validatedtag);
    return expect(validatedtag).toBeDefined();
});

test('Creates and instance of the tag model', () => {
    const tag = {
        name: 'Space Exploration'
    }
    const newtag = Tag.build(tag);

    return expect(newtag).toBeInstanceOf(Tag)
});