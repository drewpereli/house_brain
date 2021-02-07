'use strict';
require('dotenv').config();
const { Model } = require('sequelize');
const axios = require('axios');

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

    async requestStatus(status) {
      let url = new URL(`http://${this.ipAddress}`);
      url.port = process.env.BOARD_PORT;
      url.pathname = status === 'active' ? '/on' : '/off';
      await axios.post(url.toString());
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
