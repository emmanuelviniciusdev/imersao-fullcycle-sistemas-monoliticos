import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { InvoiceItemEntity } from "../domain/entity/invoice-item.entity";

export const INVOICE_ITEM_IDENTIFIER_1 = new Identifier(
    "bd4d7280-130f-45d7-845f-5418a9d32fa0",
);

export const INVOICE_ITEM_IDENTIFIER_2 = new Identifier(
    "b9e73ec4-a181-481e-ab8b-161c80c2adf1",
);

export const INVOICE_ITEM_IDENTIFIER_3 = new Identifier(
    "8e795925-993d-4e6f-855d-aad6ad6e2bf4",
);

export const GET_INVOICE_ITEM_ENTITY_1 = (idInvoice: Identifier) =>
    new InvoiceItemEntity({
        id: INVOICE_ITEM_IDENTIFIER_1,
        name: "Product #1",
        price: 4.9,
        idInvoice,
    });

export const GET_INVOICE_ITEM_ENTITY_2 = (idInvoice: Identifier) =>
    new InvoiceItemEntity({
        id: INVOICE_ITEM_IDENTIFIER_2,
        name: "Product #2",
        price: 14.9,
        idInvoice,
    });

export const GET_INVOICE_ITEM_ENTITY_3 = (idInvoice: Identifier) =>
    new InvoiceItemEntity({
        id: INVOICE_ITEM_IDENTIFIER_3,
        name: "Product #3",
        price: 0.2,
        idInvoice,
    });
