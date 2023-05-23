import { Table, Column, Model, DataType, HasMany, ForeignKey, PrimaryKey, AutoIncrement, Unique, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Product } from './product';
import { Barcode } from './barcode';
import { UserProductCount } from '../userproductcounts/userProductCount';

@Table
export class Subproduct extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @ForeignKey(() => Product)
    @Column(DataType.INTEGER.UNSIGNED)
    productId!: number;

    @Column(DataType.INTEGER.UNSIGNED)
    quantity!: number;

    @Unique
    @Column(DataType.STRING)
    name!: string;

    @BelongsTo(() => Product)
    product?: Product;

    @HasMany(() => Barcode, 'subproductId')
    barcodes?: Barcode[];

    @HasMany(() => UserProductCount, 'subproductId')
    productCounts?: UserProductCount[];

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}