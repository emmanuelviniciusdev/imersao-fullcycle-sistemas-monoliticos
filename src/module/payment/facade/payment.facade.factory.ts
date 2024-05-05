import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUsecase } from "../usecase/process-payment.usecase";
import { PaymentFacade } from "./payment.facade";

export class PaymentFacadeFactory {
    static create() {
        const transactionRepository = new TransactionRepository();

        const processPaymentUsecase = new ProcessPaymentUsecase(
            transactionRepository,
        );

        return new PaymentFacade(processPaymentUsecase);
    }
}
