import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, AutoIncrement, HasMany, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { CountPlan } from '../countplans/countPlan';
import { UserProductCount } from '../userproductcounts/userProductCount';

@Table
export class CountExecution extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @ForeignKey(() => CountPlan)
    @Column(DataType.INTEGER.UNSIGNED)
    countPlanId!: number;

    @Column(DataType.ENUM('ongoing', 'started', 'ended'))
    status!: string;

    @BelongsTo(() => CountPlan)
    countPlan?: CountPlan;

    @HasMany(() => UserProductCount, 'countExecutionId')
    userProductCounts?: UserProductCount[];

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}