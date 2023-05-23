'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('Products', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  await queryInterface.addIndex('Products', ['name']);
  await queryInterface.addIndex('Products', ['category']);
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.removeIndex('Products', ['name']);
  await queryInterface.removeIndex('Products', ['category']);
  await queryInterface.dropTable('Products');
};
