import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";

export interface InvoiceItemEntityInterface {
    id: Identifier;
    name: string;
    price: number;
    idInvoice: Identifier;
    createdAt: Date;
    updatedAt: Date;
}
