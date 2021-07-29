const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Team extends Model {}

Team.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    motto: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'team'
});


module.exports = Team;