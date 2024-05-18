import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";
import { InvoiceModel } from "../../repository/invoice.model";
import { Address } from "../value-object/address.value-object";
import {
    InvoiceItemEntity,
    InvoiceItemEntityInputProps,
} from "./invoice-item.entity";
import { InvoiceItemEntityInterface } from "./invoice-item.entity.interface";
import { InvoiceEntityInterface } from "./invoice.entity.interface";

type InvoiceProps = {
    id?: Identifier;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItemEntityInputProps[];
    createdAt?: Date;
    updatedAt?: Date;
};

export class InvoiceEntity
    extends BaseEntity
    implements InvoiceEntityInterface
{
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItemEntityInterface[];

    constructor(props: InvoiceProps) {
        super(props.id);

        this._name = props.name;
        this._document = props.document;
        this._address = props.address;

        this._items = props.items.map(
            (itemInput) =>
                new InvoiceItemEntity({
                    id: itemInput.id,
                    name: itemInput.name,
                    price: itemInput.price,
                    idInvoice: itemInput.idInvoice || this.id,
                    createdAt: itemInput.createdAt,
                    updatedAt: itemInput.updatedAt,
                }),
        );

        this.setTimestamps(props.createdAt, props.updatedAt);
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): InvoiceItemEntityInterface[] {
        return this._items;
    }

    static createFromModel(invoiceModel: InvoiceModel): InvoiceEntity {
        const invoiceItemEntities: InvoiceItemEntityInterface[] =
            invoiceModel.items.map((invoiceItemModel) => ({
                id: new Identifier(invoiceItemModel.id),
                name: invoiceItemModel.name,
                price: invoiceItemModel.price,
                idInvoice: new Identifier(invoiceItemModel.idInvoice),
                createdAt: invoiceItemModel.createdAt,
                updatedAt: invoiceItemModel.updatedAt,
            }));

        const addressValueObject: Address = JSON.parse(invoiceModel.address);

        return new InvoiceEntity({
            id: new Identifier(invoiceModel.id),
            name: invoiceModel.name,
            document: invoiceModel.document,
            address: addressValueObject,
            items: invoiceItemEntities,
            createdAt: invoiceModel.createdAt,
            updatedAt: invoiceModel.updatedAt,
        });
    }
}
