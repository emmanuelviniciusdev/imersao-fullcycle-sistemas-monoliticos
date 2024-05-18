import {
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
    tableName: "tb_invoice_item",
    timestamps: false,
})
export class InvoiceItemModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare idInvoice: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;
}
