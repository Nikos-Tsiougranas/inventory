'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('CountPlanUsers', {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    countPlanId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'CountPlans',
        key: 'id',
      },
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

  await queryInterface.addConstraint('CountPlanUsers', {
    fields: ['userId', 'countPlanId'],
    type: 'primary key',
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('CountPlanUsers');
};
