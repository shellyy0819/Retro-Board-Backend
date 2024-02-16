'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // board.belongsTo(models.team);
    }
  }
  board.init(
    {
      name: DataTypes.STRING,
      meeting_date: DataTypes.DATE,
      template: DataTypes.STRING,
      created_by: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'board',
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return board;
};

// board has many cards, Team has many boards and board belongs to team
