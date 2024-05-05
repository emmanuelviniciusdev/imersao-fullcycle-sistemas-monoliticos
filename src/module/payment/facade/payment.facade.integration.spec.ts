import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "../repository/transaction.model";
import { ORDER_ID_1, ORDER_ID_2 } from "../mock/transaction.entity.mock";
import { PaymentFacadeFactory } from "./payment.facade.factory";

describe("PaymentFacade Integration Tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should successfully create a transaction", async () => {
        const paymentFacade = PaymentFacadeFactory.create();

        const outputPayment1 = await paymentFacade.process({
            orderId: ORDER_ID_1,
            amount: 100.1,
        });

        expect(outputPayment1.orderId.value).toBe(ORDER_ID_1.value);
        expect(outputPayment1.status).toBe("approved");

        const outputPayment2 = await paymentFacade.process({
            orderId: ORDER_ID_2,
            amount: 1.1,
        });

        expect(outputPayment2.orderId.value).toBe(ORDER_ID_2.value);
        expect(outputPayment2.status).toBe("declined");
    });
});
