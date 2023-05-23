import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, AutoIncrement, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { User } from '../users/user';
import { Subproduct } from '../products/subproduct';
import { CountExecution } from '../countexecutions/countExecution';

@Table
export class UserProductCount extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @ForeignKey(() => CountExecution)
    @Column(DataType.INTEGER.UNSIGNED)
    countExecutionId!: number;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;

    @ForeignKey(() => Subproduct)
    @Column(DataType.INTEGER.UNSIGNED)
    subproductId!: number;

    @Column(DataType.INTEGER.UNSIGNED)
    quantity!: number;

    @BelongsTo(() => CountExecution)
    countExecution?: CountExecution;

    @BelongsTo(() => User)
    user?: User;

    @BelongsTo(() => Subproduct)
    subproduct?: Subproduct;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}