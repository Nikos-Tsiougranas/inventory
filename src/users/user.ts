import { Table, Column, Model, DataType, HasMany, BelongsToMany, PrimaryKey, AutoIncrement, Unique, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { CountPlan } from '../countplans/countPlan';
import { CountPlanUser } from '../countplans/countPlanUser';
import { UserProductCount } from '../userproductcounts/userProductCount';

@Table
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @Unique
    @Column(DataType.STRING)
    email!: string;

    @Column(DataType.STRING)
    password!: string;

    @Default('counter')
    @Column(DataType.ENUM('admin', 'counter'))
    role!: string;

    @HasMany(() => CountPlan, 'ownerId')
    countPlans?: CountPlan[];

    @BelongsToMany(() => CountPlan, () => CountPlanUser)
    assignedCountPlans?: CountPlan[];

    @HasMany(() => UserProductCount, 'userId')
    productCounts?: UserProductCount[];

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}