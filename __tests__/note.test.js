const { expect } = require('@jest/globals');
const sequelize = require('sequelize');
const { Note } = require('../models');

test('Check for note validation', async () => {
    const note = {
        text: 'We made it to space',
        goal_id: '1',
        milestone_id: '1'
    }
    const newnote = Note.build(note);
    const validatednote = await newnote.validate();
    console.log(validatednote);
    return expect(validatednote).toBeDefined();
});

test('Creates and instance of the note model', () => {
    const note = {
        text: 'We made it to space',
        goal_id: '1',
        milestone_id: '1'
    }
    const newnote = Note.build(note);

    return expect(newnote).toBeInstanceOf(Note)
});