import { Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement, Unique, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Subproduct } from './subproduct';

@Table
export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @Unique
    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.DECIMAL(10, 2))
    price!: number;

    @Column(DataType.STRING)
    category!: string;

    @HasMany(() => Subproduct, 'productId')
    subproducts?: Subproduct[];

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}