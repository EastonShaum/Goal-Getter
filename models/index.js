const Tag = require('./Tag');
const Team = require('./Team');
const User = require('./User');
const Goal = require('./Goal');
const GoalTag = require('./GoalTag');
const Milestone = require('./Milestone');
const Note = require('./Note');

// associations
User.hasMany(Goal, {as: 'goals'});
Goal.belongsTo(User);

//Goal.belongsToMany(Tag, {
    //through: GoalTag,
    //as: 'tags'
//});
//Tag.belongsToMany(Goals, {
    //through: GoalTag,
    //as: 'goals'
//});

//User.belongsToMany(Milestone, {
    //foreignKey: 'user_id'
//});

//User.belongsToMany(Goal, {
    //through: Team,
    //as: 'team_goals',
    //foreignKey: 'user_id'
//});

//User.belongsToMany(Team, {
    //through: Milestone,
    //as: 'goal_milestones',
    //foreignKey: 'user_id'
//});

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

module.exports = { Tag, Team, User, Goal, GoalTag, Milestone, Note };