const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const tomorrowsDate = require('../utils/nextDay.js');

class Goal extends Model {}

Goal.init({
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
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'goal'
});

module.exports = Goal;