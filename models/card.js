'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  card.init(
    {
      title: DataTypes.STRING,
      order_no: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'card',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return card;
};
