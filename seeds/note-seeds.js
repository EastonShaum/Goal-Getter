const { Note } = require('../models');

const noteData = [
    {
        text: 'Fitter than ever',
        goal_id: 1,
        milestone_id: null
    },
    {
        text: 'Woohoo',
        goal_id: null,
        milestone_id: 1
    },
    {
        text: 'YAY!',
        goal_id: null,
        milestone_id: 2
    },
];

const seedNotes = () => Note.bulkCreate(noteData);

module.exports = seedNotes;