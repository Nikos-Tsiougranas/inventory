'use strict';

import {QueryInterface, DataTypes} from "sequelize";

module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM,
        values: ['admin', 'counter'],
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
    await queryInterface.addIndex('Users', ['email']);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeIndex('Users', ['email']);
    await queryInterface.dropTable('Users');
  }
};
