'use strict';

import {QueryInterface} from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: 'c8c5c48edd4ab634e320482863226ad29334b13d5f9a460cf66a9a88e893b9df', // adminPass
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'counter1@gmail.com',
      password: '24b8dc319e30a3dcb01117e0bc0836de12138ea8d7eabcdb0a037fddf21d9fe6', // counterPass
      role: 'counter',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      email: 'counter2@gmail.com',
      password: '24b8dc319e30a3dcb01117e0bc0836de12138ea8d7eabcdb0a037fddf21d9fe6', // counterPass
      role: 'counter',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
};
