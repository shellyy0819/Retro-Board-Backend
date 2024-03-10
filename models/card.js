'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Board, {
        as: 'board',
        targetKey: 'id',
        foreignKey: 'board_id'
      });
      this.belongsTo(models.Column, {
        as: 'column',
        targetKey: 'id',
        foreignKey: 'column_id'
      });
    }
  }
  Card.init(
    {
      title: {
        type: DataTypes.STRING
      },
      order_no: {
        type: DataTypes.INTEGER
      },
      column_id: {
        allowNull: false,
        primaryKey: false,
        type: DataTypes.UUID
      },
      board_id: {
        allowNull: false,
        primaryKey: false,
        type: DataTypes.UUID
      }
    },
    {
      sequelize,
      modelName: 'Card',
      tableName: 'cards',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return Card;
};
