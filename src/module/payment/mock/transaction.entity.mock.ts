import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { TransactionEntity } from "../domain/transaction.entity";

export const TRANSACTION_ID_1 = new Identifier(
    "c9fa8fa2-91d7-4981-9e3f-0ccc3f477a83",
);

export const ORDER_ID_1 = new Identifier(
    "927e6654-76d8-4346-b1fb-825c42c1babb",
);

export const TRANSACTION_ID_2 = new Identifier(
    "e504dd53-e279-4dd9-8777-704dcb3a4795",
);

export const ORDER_ID_2 = new Identifier(
    "b260b3a0-0031-449b-850d-a8463342b9af",
);

export const TRANSACTION_ENTITY_APPROVED_1 = new TransactionEntity({
    id: TRANSACTION_ID_1,
    orderId: ORDER_ID_1,
    amount: 399.99,
    status: "approved",
    createdAt: new Date("2001-01-01"),
    updatedAt: new Date("2002-02-02"),
});

export const TRANSACTION_ENTITY_DECLINED_2 = new TransactionEntity({
    id: TRANSACTION_ID_2,
    orderId: ORDER_ID_2,
    amount: 59.99,
    status: "declined",
    createdAt: new Date("2001-01-01"),
    updatedAt: new Date("2002-02-02"),
});
