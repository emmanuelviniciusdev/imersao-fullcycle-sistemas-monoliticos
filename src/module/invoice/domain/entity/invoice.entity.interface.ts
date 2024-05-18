import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";
import { Address } from "../value-object/address.value-object";
import { InvoiceItemEntityInterface } from "./invoice-item.entity.interface";

export interface InvoiceEntityInterface {
    id: Identifier;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItemEntityInterface[];
    createdAt: Date;
    updatedAt: Date;
}
