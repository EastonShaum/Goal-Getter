const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
        allowNull: false
    },
    due_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    goal_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = Milestone;