const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    goal_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'goal',
            key: 'id'
        }
    },
    milestone_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'milestone',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'note'
})

module.exports = Note;