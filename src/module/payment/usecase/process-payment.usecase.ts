import { UsecaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import { TransactionEntity } from "../domain/transaction.entity";
import { PaymentGateway } from "../gateway/payment.gateway";
import {
    ProcessPaymentInputDTO,
    ProcessPaymentOutputDTO,
} from "./process-payment.usecase.dto";

export class ProcessPaymentUsecase
    implements
        UsecaseInterface<ProcessPaymentInputDTO, ProcessPaymentOutputDTO>
{
    private _repository: PaymentGateway;

    constructor(repository: PaymentGateway) {
        this._repository = repository;
    }

    async execute(
        input: ProcessPaymentInputDTO,
    ): Promise<ProcessPaymentOutputDTO> {
        const transaction = new TransactionEntity({
            orderId: input.orderId,
            amount: input.amount,
        });

        transaction.process();

        const persistedTransaction = await this._repository.save(transaction);

        const output: ProcessPaymentOutputDTO = {
            transactionId: persistedTransaction.id,
            orderId: persistedTransaction.orderId,
            amount: persistedTransaction.amount,
            status: persistedTransaction.status,
            createdAt: persistedTransaction.createdAt,
            updatedAt: persistedTransaction.updatedAt,
        };

        return output;
    }
}
