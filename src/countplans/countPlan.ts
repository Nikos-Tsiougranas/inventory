import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, AutoIncrement, HasMany, BelongsTo, CreatedAt, UpdatedAt, BelongsToMany } from 'sequelize-typescript';
import { User } from '../users/user';
import { CountExecution } from '../countexecutions/countExecution';
import { CountPlanUser } from './countPlanUser';

@Table
export class CountPlan extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @Column(DataType.STRING)
    name!: string;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER.UNSIGNED)
    ownerId!: number;

    @Column(DataType.ENUM('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'))
    day!: string;

    @Column(DataType.ENUM('weekly', 'biweekly'))
    frequency!: string;

    @Column(DataType.DATE)
    latestCountExecutionCreated?: Date;

    @BelongsTo(() => User)
    owner?: User;

    @HasMany(() => CountExecution, 'countPlanId')
    countExecutions?: CountExecution[];

    @BelongsToMany(() => User, () => CountPlanUser)
    usersToNotify?: User[];

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}
