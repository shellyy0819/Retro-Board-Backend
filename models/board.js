'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Card, {
        as: 'cards',
        sourceKey: 'id',
        foreignKey: 'board_id'
      });
      this.belongsTo(models.Team, {
        as: 'team',
        targetKey: 'id',
        foreignKey: 'team_id'
      });
      this.belongsToMany(models.Column, {
        through: models.BoardColumn,
        as: 'columns',
        otherKey: 'column_id',
        targetKey: 'id',
        foreignKey: 'board_id'
      });
    }
  }
  Board.init(
    {
      team_id: {
        allowNull: false,
        primaryKey: false,
        type: DataTypes.UUID
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      meeting_date: {
        type: DataTypes.DATE
      },
      template: {
        type: DataTypes.STRING
      },
      created_by: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: 'Board',
      tableName: 'boards',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return Board;
};
