import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { InvoiceItemEntityInterface } from "../domain/entity/invoice-item.entity.interface";
import { InvoiceEntityInterface } from "../domain/entity/invoice.entity.interface";
import { Address } from "../domain/value-object/address.value-object";

export type FindInvoiceInput = {
    idInvoice: Identifier;
};

export interface InvoiceGateway {
    save(input: InvoiceEntityInterface): Promise<InvoiceEntityInterface>;
    find(input: FindInvoiceInput): Promise<Partial<InvoiceEntityInterface>>;
}
