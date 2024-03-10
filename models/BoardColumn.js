'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BoardColumn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Board, {
        targetKey: 'id',
        foreignKey: 'board_id'
      });
      this.belongsTo(models.Column, {
        targetKey: 'id',
        foreignKey: 'column_id'
      });
    }
  }
  BoardColumn.init(
    {
      board_id: {
        allowNull: false,
        type: DataTypes.UUID
      },
      column_id: {
        allowNull: false,
        type: DataTypes.UUID
      }
    },
    {
      sequelize,
      modelName: 'BoardColumn',
      tableName: 'boards_columns',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return BoardColumn;
};
