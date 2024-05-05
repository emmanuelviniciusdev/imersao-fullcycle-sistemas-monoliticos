import { TransactionEntityInterface } from "../domain/transaction.entity.interface";

export interface PaymentGateway {
    save(
        input: TransactionEntityInterface,
    ): Promise<TransactionEntityInterface>;
}
