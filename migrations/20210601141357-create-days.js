'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Days', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      drugName: {
        type: Sequelize.STRING
      },
      sunday: {
        type: Sequelize.BOOLEAN
      },
      monday: {
        type: Sequelize.BOOLEAN
      },
      tuesday: {
        type: Sequelize.BOOLEAN
      },
      wednesday: {
        type: Sequelize.BOOLEAN
      },
      thursday: {
        type: Sequelize.BOOLEAN
      },
      friday: {
        type: Sequelize.BOOLEAN
      },
      saturday: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Days');
  }
};