import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { TransactionStatus } from "../domain/transaction.entity";

export interface PaymentFacadeInputDTO {
    orderId: Identifier;
    amount: number;
}

export interface PaymentFacadeOutputDTO {
    transactionId: Identifier;
    orderId: Identifier;
    status: TransactionStatus;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentFacadeInterface {
    process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO>;
}
