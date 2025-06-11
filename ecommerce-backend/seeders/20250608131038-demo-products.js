"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Laptop",
          image:
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3",
          price: 49990,
          discountedPrice: 34990,
          categoryId: 1, // Electronics
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "iPhone 10",
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3",
          price: 70000,
          discountedPrice: 50000,
          categoryId: 1, // Electronics
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jeans",
          image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
          price: 999,
          discountedPrice: 799,
          categoryId: 2, // Clothing
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "T-Shirt",
          image:
            "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3",
          price: 500,
          discountedPrice: 450,
          categoryId: 2, // Clothing
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Book",
          image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
          price: 699,
          discountedPrice: 499,
          categoryId: 3, // Books
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Self Help",
          image:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3",
          price: 4000,
          discountedPrice: 3500,
          categoryId: 3, // Books
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kichen Table",
          image:
            "https://images.unsplash.com/photo-1723259456519-3c97fb8b23ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          price: 40000,
          discountedPrice: 35000,
          categoryId: 4, // Home Appliances
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
