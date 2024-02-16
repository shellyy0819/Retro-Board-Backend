'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class column extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  column.init(
    {
      title: DataTypes.STRING,
      tags: DataTypes.STRING,
      board_id: DataTypes.UUID
    },
    {
      sequelize,
      modelName: 'column',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return column;
};
