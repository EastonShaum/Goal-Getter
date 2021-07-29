const { Note } = require('../models');

const noteData = [
    {
        text: 'YAY!',
        goal_id: null,
        milestone_id: 2
    },
];

const seedNotes = () => Note.bulkCreate(noteData);

module.exports = seedNotes;