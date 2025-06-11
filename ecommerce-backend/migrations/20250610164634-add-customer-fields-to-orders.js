"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Orders", "name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Orders", "email", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Orders", "address", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Orders", "phone", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("Orders", "totalAmount", {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Orders", "name");
    await queryInterface.removeColumn("Orders", "email");
    await queryInterface.removeColumn("Orders", "address");
    await queryInterface.removeColumn("Orders", "phone");
    await queryInterface.removeColumn("Orders", "totalAmount");
  },
};
