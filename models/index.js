const Tag = require('./Tag');
const Team = require('./Team');
const User = require('./User');
const Userteam = require('./Userteam');
const Goal = require('./Goal');
const Goaltag = require('./GoalTag');
const Milestone = require('./Milestone');
const Note = require('./Note');

// =============================
// ASSOCIATIONS
// =============================
// User x Goal - implied user_id foreign key
User.hasMany(Goal);
Goal.belongsTo(User);

// Goal x Milestone - implied goal_id foreign key
Goal.hasMany(Milestone);
Milestone.belongsTo(Goal);

// Note x Milestone X Goal - implied goal_id/milestone_id foreign key
Milestone.hasMany(Note);
Goal.hasMany(Note);
Note.belongsTo(Goal);
Note.belongsTo(Milestone);

// User x Milestones - implied user_id foreign key
Milestone.belongsTo(User);
User.hasMany(Milestone);

// Goal X Tag through Goaltag
Goal.belongsToMany(Tag, {
    through: Goaltag,
    foreignKey: 'goal_id'
});
Tag.belongsToMany(Goal, {
    through: Goaltag,
    foreignKey: 'tag_id'
});

// User X Team through Userteam
User.belongsToMany(Team, {
    through: Userteam,
    foreignKey: 'user_id'
});
Team.belongsToMany(User, {
    through: Userteam,
    foreignKey: 'team_id'
});

Goal.belongsTo(Team, {
    through: Userteam,
    foreignKey: "user_id"
})

module.exports = { Tag, Team, User, Userteam, Goal, Goaltag, Milestone, Note };