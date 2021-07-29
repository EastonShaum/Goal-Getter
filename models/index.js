const Goal = require('./Goal');
const Milestone = require('./Milestone');
const Team = require('./Team');
const User = require('./User');
const Tag = require('./Tag');
const Note = require('./Note');

// associations
// User.belongsToMany(Milestone, {
//     foreignKey: 'user_id'
// });

// User.belongsToMany(Goal, {
//     through: Team,
//     as: 'team_goals',
//     foreignKey: 'user_id'
// })

// User.belongsToMany(Team, {
//     through: Milestone,
//     as: 'goal_milestones',
//     foreignKey: 'user_id'
// });

// Team.belongsToMany(User, {
//     foreignKey: 'team_id'
// });

// Team.belongsToMany(Goal, {
//     foreignKey: 'team_id'
// });

// Goal.belongsTo(Team, {
//     foreignKey: 'team_id'
// });

// Goal.belongsToMany(Milestone, {
//     foreignKey: 'goal_id'
// });

// Milestone.belongsTo(User, {
//     foreignKey: 'milestone_id'
// });

// Milestone.belongsTo(Goal, {
//     foreignKey: 'mile'
// });

module.exports = { User, Team, Milestone, Goal, Tag };