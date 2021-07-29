const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class GoalTag extends Model {}

GoalTag.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    goal_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'goal',
            key: 'id'
        }
    },
    tag_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tag',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'goal_tag'
});

module.export = GoalTag;