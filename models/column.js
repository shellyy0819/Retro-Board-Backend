'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Column extends Model {
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
        foreignKey: 'column_id'
      });
      this.belongsToMany(models.Board, {
        through: models.BoardColumn,
        as: 'boards',
        otherKey: 'board_id',
        targetKey: 'id',
        foreignKey: 'column_id'
      });
    }
  }
  Column.init(
    {
      title: {
        type: DataTypes.STRING
      },
      tags: {
        type: DataTypes.STRING
      },
      board_id: {
        allowNull: false,
        primaryKey: false,
        type: DataTypes.UUID
      }
    },
    {
      sequelize,
      modelName: 'Column',
      tableName: 'columns',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return Column;
};
