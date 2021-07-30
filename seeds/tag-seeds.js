const { Tag } = require('../models');

const tagData = [
    {
        name: 'Fitness',
    },
    {
        name: 'Financial',
    },
    {
        name: 'Mental Health',
    },
    {
        name: 'Health',
    },
    {
        name: 'Diet',
    },
    {
        name: 'Career',
    },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;