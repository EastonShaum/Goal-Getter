const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const tomorrowsDate = require('../utils/nextDay.js')

class Milestone extends Model {}

Milestone.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    due_date: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isAfter: tomorrowsDate()
        }
    },
    is_public: {
        type: DataTypes.BOOLEAN,
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "To Do", // To Do, In Progress, Completed
        validate: {
            isIn: [
                ["To Do", "In Progress", "Completed"]
            ]
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'milestone'
})

module.exports = Milestone;