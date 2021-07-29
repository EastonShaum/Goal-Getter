const seedTags = require('./tag-seeds');
const seedTeams = require('./team-seeds');
const seedUsers = require('./user-seeds');
const seedGoals = require('./goal-seeds');
const seedGoalTags = require('./goaltag-seeds');
const seedMilestones = require('./milestone-seeds');
const seedNotes = require('./note-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('DATABASE SYNCED');

    await seedTags();
    console.log('TAGS SEEDED');

    await seedTeams();
    console.log('TEAMS SEEDED');

    await seedUsers();
    console.log('USERS SEEDED');

    await seedGoals();
    console.log('GOALS SEEDED');

    await seedGoalTags();
    console.log('THROUGH TABLE SEEDED');

    await seedMilestones();
    console.log('MILESTONES SEEDED');

    await seedNotes();
    console.log('NOTES SEEDED');
};

seedAll();