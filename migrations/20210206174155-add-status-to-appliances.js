'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Appliances', 'status', {
      type: Sequelize.ENUM('inactive', 'active'),
      defaultValue: 'inactive',
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Appliances', 'status');
  },
};
