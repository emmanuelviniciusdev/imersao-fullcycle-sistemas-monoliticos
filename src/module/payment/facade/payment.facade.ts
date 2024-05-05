import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import {
    ProcessPaymentInputDTO,
    ProcessPaymentOutputDTO,
} from "../usecase/process-payment.usecase.dto";
import {
    PaymentFacadeInputDTO,
    PaymentFacadeInterface,
    PaymentFacadeOutputDTO,
} from "./payment.facade.interface";

export class PaymentFacade implements PaymentFacadeInterface {
    constructor(
        private processPaymentUsecase: UsecaseInterface<
            ProcessPaymentInputDTO,
            ProcessPaymentOutputDTO
        >,
    ) {}

    async process(
        input: PaymentFacadeInputDTO,
    ): Promise<PaymentFacadeOutputDTO> {
        const output = await this.processPaymentUsecase.execute({ ...input });

        return {
            transactionId: output.transactionId,
            orderId: output.orderId,
            status: output.status,
            amount: output.amount,
            createdAt: output.createdAt,
            updatedAt: output.updatedAt,
        };
    }
}
