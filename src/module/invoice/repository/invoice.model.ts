import {
    Column,
    HasMany,
    Model,
    PrimaryKey,
    Table,
} from "sequelize-typescript";
import { InvoiceItemModel } from "./invoice-item.model";

@Table({
    tableName: "tb_invoice",
    timestamps: false,
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare document: string;

    @Column({ allowNull: false })
    declare address: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

    @HasMany(() => InvoiceItemModel)
    declare items: InvoiceItemModel[];
}
