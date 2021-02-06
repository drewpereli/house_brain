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
      this.belongsTo(models.Appliance);
    }

    serialize() {
      let { id, ipAddress, ApplianceId: appliance } = this;
      return { id, ipAddress, appliance };
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
      ApplianceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Board',
    }
  );
  return Board;
};
