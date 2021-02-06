'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Boards', 'ApplianceId', {
      type: Sequelize.INTEGER,
      references: { model: 'Appliances', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Boards', 'ApplianceId');
  },
};
