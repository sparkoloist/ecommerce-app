"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        { name: "Electronics", createdAt: new Date(), updatedAt: new Date() },
        { name: "Clothing", createdAt: new Date(), updatedAt: new Date() },
        { name: "Books", createdAt: new Date(), updatedAt: new Date() },
        {
          name: "Home Appliances",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Beauty & Personal Care",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
