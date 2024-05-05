import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { TransactionStatus } from "./transaction.entity";

export interface TransactionEntityInterface {
    id: Identifier;
    amount: number;
    orderId: Identifier;
    status: TransactionStatus;
    createdAt: Date;
    updatedAt: Date;
}
