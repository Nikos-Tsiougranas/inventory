'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('CountPlans', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    day: {
      type: DataTypes.ENUM,
      values: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      allowNull: false,
    },
    frequency: {
      type: DataTypes.ENUM,
      values: ['weekly', 'biweekly'],
      allowNull: false
    },
    latestCountExecutionCreated: {
      allowNull: true,
      type: DataTypes.DATE,
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
  await queryInterface.dropTable('CountPlans');
};
