"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          id: 1,
          name: "Electronics",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Clothing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 3, name: "Books", createdAt: new Date(), updatedAt: new Date() },
        {
          id: 4,
          name: "Home Appliances",
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
