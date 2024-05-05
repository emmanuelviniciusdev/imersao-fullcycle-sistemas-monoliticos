import {
    ORDER_ID_1,
    ORDER_ID_2,
    TRANSACTION_ENTITY_APPROVED_1,
    TRANSACTION_ENTITY_DECLINED_2,
    TRANSACTION_ID_1,
    TRANSACTION_ID_2,
} from "../mock/transaction.entity.mock";
import { ProcessPaymentUsecase } from "./process-payment.usecase";

const MockRepositoryApprovedPayment = () => ({
    save: jest.fn().mockReturnValue(TRANSACTION_ENTITY_APPROVED_1),
});

const MockRepositoryDeclinedPayment = () => ({
    save: jest.fn().mockReturnValue(TRANSACTION_ENTITY_DECLINED_2),
});

describe("ProcessPaymentUsecase Unit Tests", () => {
    it("should successfully proccess a payment (approved)", async () => {
        const repository = MockRepositoryApprovedPayment();

        const usecase = new ProcessPaymentUsecase(repository);

        const output = await usecase.execute({
            orderId: ORDER_ID_1,
            amount: 399.99,
        });

        expect(repository.save).toHaveBeenCalled();

        expect(output.transactionId.value).toBe(TRANSACTION_ID_1.value);
        expect(output.orderId.value).toBe(ORDER_ID_1.value);
        expect(output.status).toBe("approved");
    });

    it("should successfully proccess a payment (declined)", async () => {
        const repository = MockRepositoryDeclinedPayment();

        const usecase = new ProcessPaymentUsecase(repository);

        const output = await usecase.execute({
            orderId: ORDER_ID_2,
            amount: 59.99,
        });

        expect(repository.save).toHaveBeenCalled();

        expect(output.transactionId.value).toBe(TRANSACTION_ID_2.value);
        expect(output.orderId.value).toBe(ORDER_ID_2.value);
        expect(output.status).toBe("declined");
    });
});
