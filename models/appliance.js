'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appliance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Board);
    }

    async serialize() {
      let { id, type, name, status } = this;

      return { id, type, name, status };
    }

    async updateStatus(status) {
      await this.update({ status });
      let board = await this.getBoard();
      await board.requestStatus(status);
    }
  }
  Appliance.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.ENUM(['lamp']),
      status: {
        type: DataTypes.ENUM(['inactive', 'active']),
        allowNull: false,
        defaultValue: 'inactive',
      },
    },
    {
      sequelize,
      modelName: 'Appliance',
    }
  );
  return Appliance;
};
