const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Goaltag extends Model {}

Goaltag.init({
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
    modelName: 'goaltag'
});

module.export = Goaltag;