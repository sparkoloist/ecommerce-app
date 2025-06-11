"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add column as nullable
    await queryInterface.addColumn("Products", "categoryId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // or CASCADE based on preference
    });

    // Step 2: Set default categoryId for existing records (e.g., 1)
    await queryInterface.sequelize.query(`
      UPDATE "Products" SET "categoryId" = 1
    `);

    // Step 3: Change column to NOT NULL
    await queryInterface.changeColumn("Products", "categoryId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Products", "categoryId");
  },
};
