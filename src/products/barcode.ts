import { Table, Column, Model, DataType, ForeignKey, PrimaryKey, AutoIncrement, BelongsTo, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Subproduct } from './subproduct';

@Table
export class Barcode extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    id!: number;

    @ForeignKey(() => Subproduct)
    @Column(DataType.INTEGER.UNSIGNED)
    subproductId!: number;

    @Column(DataType.STRING)
    code!: string;

    @BelongsTo(() => Subproduct)
    subproduct?: Subproduct;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;
}