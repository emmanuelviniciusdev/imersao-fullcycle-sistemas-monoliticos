import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";
import { TransactionRepository } from "./transaction.repository";
import { TransactionEntity } from "../domain/transaction.entity";
import { ORDER_ID_1, TRANSACTION_ID_1 } from "../mock/transaction.entity.mock";

describe("TransactionRepository Integration Tests", () => {
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

    it("should successfully save a transaction", async () => {
        const repository = new TransactionRepository();

        const transaction = new TransactionEntity({
            id: TRANSACTION_ID_1,
            orderId: ORDER_ID_1,
            amount: 99.99,
        });

        const persistedTransaction = await repository.save({
            id: transaction.id,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        });

        expect(persistedTransaction.id.value).toBe(TRANSACTION_ID_1.value);
        expect(persistedTransaction.orderId.value).toBe(ORDER_ID_1.value);
        expect(persistedTransaction.amount).toBe(99.99);
        expect(persistedTransaction.status).toBe(transaction.status);
    });
});
