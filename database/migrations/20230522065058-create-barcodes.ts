'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('Barcodes', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    subproductId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Subproducts',
        key: 'id',
      },
    },
    code: {
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
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('Barcodes');
};
