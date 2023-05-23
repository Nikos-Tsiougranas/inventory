'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('Subproducts', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true
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
  await queryInterface.addIndex('Subproducts', ['name']);
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.removeIndex('Subproducts', ['name']);
  await queryInterface.dropTable('Subproducts');
};
