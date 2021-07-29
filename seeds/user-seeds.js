const { User } = require('../models');

const userData = [
    {
        username: 'jamie_fraser',
        first_name: 'James',
        last_name: 'Fraser',
        email: 'jf@goldenbough.edu',
        password: '12345',
        team_id: 1,
    },
    {
        username: 'jack_london',
        first_name: 'Jack',
        last_name: 'London',
        email: 'jlondon@ualaska.edu',
        password: '12345',
        team_id: 2,
    },
    {
        username: 'robert_bruce',
        first_name: 'Robert',
        last_name: 'Bruce',
        email: 'rbruce@scottland.net',
        password: '12345',
        team_id: 3,
    },
    {
        username: 'peter_greenaway',
        first_name: 'Peter',
        last_name: 'Greenaway',
        email: 'pgreenaway@postmodern.com',
        password: '12345',
        team_id: 1,
    },
    {
        username: 'derek_jarman',
        first_name: 'Derek',
        last_name: 'Jarman',
        email: 'djarman@prospectcottage.net',
        password: '12345',
        team_id: null,
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;