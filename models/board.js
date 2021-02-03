'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //     // define association here
    // }

    serialize() {
      let { id, ipAddress } = this;
      return { id, ipAddress };
    }
  }

  Board.init(
    {
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isIPv4: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Board',
    }
  );
  return Board;
};
