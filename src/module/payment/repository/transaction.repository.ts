import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import {
    TransactionEntity,
    TransactionStatus,
} from "../domain/transaction.entity";
import { TransactionEntityInterface } from "../domain/transaction.entity.interface";
import { PaymentGateway } from "../gateway/payment.gateway";
import { TransactionModel } from "./transaction.model";

export class TransactionRepository implements PaymentGateway {
    async save(
        input: TransactionEntityInterface,
    ): Promise<TransactionEntityInterface> {
        const persistedTransaction = await TransactionModel.create({
            id: input.id.value,
            orderId: input.orderId.value,
            amount: input.amount,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });

        return new TransactionEntity({
            id: new Identifier(persistedTransaction.id),
            orderId: new Identifier(persistedTransaction.orderId),
            amount: persistedTransaction.amount,
            status: persistedTransaction.status as TransactionStatus,
            createdAt: persistedTransaction.createdAt,
            updatedAt: persistedTransaction.updatedAt,
        });
    }
}
