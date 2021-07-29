const Tag = require('./Tag');
const Team = require('./Team');
const User = require('./User');
const Userteam = require('./Userteam');
const Goal = require('./Goal');
const Goaltag = require('./Goaltag');
const Milestone = require('./Milestone');
const Note = require('./Note');

// associations
User.hasMany(Goal, {as: 'goals'});
Goal.belongsTo(User);

Goal.hasMany(Milestone, {as: 'milestones'});
Milestone.belongsTo(Goal);

Goal.belongsToMany(Tag, {
    through: Goaltag,
    as: 'tags',
    foreginKey: 'goal_id'
});
Tag.belongsToMany(Goal, {
    through: Goaltag,
    as: 'goals',
    foreignKey: 'tag_id'
});

User.belongsToMany(Team, {
    through: Userteam,
    as: 'teams',
    foreignKey: 'user_id'
});
Team.belongsToMany(User, {
    through: Userteam,
    as: 'users',
    foreignKey: 'team_id'
});

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

module.exports = { Tag, Team, User, Userteam, Goal, Goaltag, Milestone, Note };