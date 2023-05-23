import { Table, Column, Model, DataType, ForeignKey, CreatedAt, UpdatedAt, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { User } from '../users/user';
import { CountPlan } from './countPlan';

@Table({tableName: 'CountPlanUsers'})
export class CountPlanUser extends Model {
    @ForeignKey(() => User)
    @PrimaryKey
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;

    @ForeignKey(() => CountPlan)
    @PrimaryKey
    @Column(DataType.INTEGER.UNSIGNED)
    countPlanId!: number;

    @BelongsTo(() => User)
    user?: User;

    @BelongsTo(() => CountPlan)
    countPlan?: CountPlan;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}