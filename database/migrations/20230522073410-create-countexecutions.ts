'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('CountExecutions', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    countPlanId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'CountPlans',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ongoing', 'started', 'ended'],
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
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('CountExecutions');
};
