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
      title: DataTypes.STRING,
      order_no: DataTypes.INTEGER,
      column_id: DataTypes.STRING,
      board_id: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Card',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return Card;
};
