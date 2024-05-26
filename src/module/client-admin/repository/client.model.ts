import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "tb_client",
    timestamps: false,
})
export class ClientModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare email: string;

    @Column({ allowNull: false })
    declare address: string;

    @Column
    declare document: string;

    @Column
    declare street: string;

    @Column
    declare number: string;

    @Column
    declare complement: string;

    @Column
    declare city: string;

    @Column
    declare state: string;

    @Column
    declare zipCode: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;
}
