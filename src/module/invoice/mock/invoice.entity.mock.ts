import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { InvoiceEntity } from "../domain/entity/invoice.entity";
import { ADDRESS_1 } from "./address.value-object.mock";
import {
    GET_INVOICE_ITEM_ENTITY_1,
    GET_INVOICE_ITEM_ENTITY_2,
    GET_INVOICE_ITEM_ENTITY_3,
} from "./invoice-item.entity.mock";

export const INVOICE_IDENTIFIER_1 = new Identifier(
    "87223f59-2dfc-4a6e-8927-d38f8c95240f",
);

export const INVOICE_IDENTIFIER_2 = new Identifier(
    "e732b6ab-5c31-4144-8e4c-46441cd8a83a",
);

export const INVOICE_ENTITY_1 = new InvoiceEntity({
    id: INVOICE_IDENTIFIER_1,
    name: "Invoice #1",
    document: "111.111-1",
    address: ADDRESS_1,
    items: [
        GET_INVOICE_ITEM_ENTITY_1(INVOICE_IDENTIFIER_1),
        GET_INVOICE_ITEM_ENTITY_2(INVOICE_IDENTIFIER_1),
    ],
    createdAt: new Date("2001-01-01"),
    updatedAt: new Date("2002-02-02"),
});

export const INVOICE_ENTITY_2 = new InvoiceEntity({
    id: INVOICE_IDENTIFIER_2,
    name: "Invoice #2",
    document: "222.222-2",
    address: ADDRESS_1,
    items: [GET_INVOICE_ITEM_ENTITY_3(INVOICE_IDENTIFIER_2)],
    createdAt: new Date("2003-03-03"),
    updatedAt: new Date("2004-04-04"),
});
