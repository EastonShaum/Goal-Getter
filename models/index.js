const Tag = require('./Tag');
const Team = require('./Team');
const User = require('./User');
const Userteam = require('./Userteam');
const Goal = require('./Goal');
const Goaltag = require('./GoalTag');
const Milestone = require('./Milestone');
const Note = require('./Note');

// associations
User.hasMany(Goal);
Goal.belongsTo(User);

Goal.hasMany(Milestone);
Milestone.belongsTo(Goal);

Milestone.hasMany(Note);
Goal.hasMany(Note);

Milestone.belongsTo(User);
User.hasMany(Milestone);

Note.belongsTo(Goal);
Note.belongsTo(Milestone);

Goal.belongsToMany(Tag, {
    through: Goaltag,
    // as: 'tags',
    foreignKey: 'goal_id'
});
Tag.belongsToMany(Goal, {
    through: Goaltag,
    // as: 'goals',
    foreignKey: 'tag_id'
});

User.belongsToMany(Team, {
    through: Userteam,
    // as: 'teams',
    foreignKey: 'user_id'
});
Team.belongsToMany(User, {
    through: Userteam,
    // as: 'users',
    foreignKey: 'team_id'
});
Goal.belongsTo(Team, {
    through: Userteam,
    foreignKey: "user_id"
})

module.exports = { Tag, Team, User, Userteam, Goal, Goaltag, Milestone, Note };