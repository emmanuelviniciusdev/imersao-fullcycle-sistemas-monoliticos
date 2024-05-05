import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { TransactionStatus } from "../domain/transaction.entity";

export interface ProcessPaymentInputDTO {
    orderId: Identifier;
    amount: number;
}

export interface ProcessPaymentOutputDTO {
    transactionId: Identifier;
    orderId: Identifier;
    status: TransactionStatus;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}
