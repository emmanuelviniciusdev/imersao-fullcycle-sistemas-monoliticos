import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";

type InvoiceItemEntityProps = {
    id?: Identifier;
    name: string;
    price: number;
    idInvoice: Identifier;
    createdAt?: Date;
    updatedAt?: Date;
};

export type InvoiceItemEntityInputProps = InvoiceItemEntityProps & {
    idInvoice?: Identifier;
};

export class InvoiceItemEntity extends BaseEntity {
    private _name: string;
    private _price: number;
    private _idInvoice: Identifier;

    constructor(props: InvoiceItemEntityProps) {
        super(props.id);

        this._name = props.name;
        this._price = props.price;
        this._idInvoice = props.idInvoice;

        this.setTimestamps(props.createdAt, props.updatedAt);
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get idInvoice(): Identifier {
        return this._idInvoice;
    }
}
