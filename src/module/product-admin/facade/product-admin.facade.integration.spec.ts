import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ProductAdminFacadeFactory } from "./product-admin.facade.factory";

const PRODUCT_ID = new Identifier("f3a2e4c8-6b7d-4e6e-9c1e-8e0a7f5d2b3b");

describe("ProductAdminFacade Integration Tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should successfully retrieve the stock number of a product", async () => {
        const productAdminFacade = ProductAdminFacadeFactory.create();

        await productAdminFacade.addProduct({
            id: PRODUCT_ID,
            name: "Water",
            description: "Fresh water for sale!",
            purchasePrice: 0.5,
            stock: 1000,
        });

        const productStockOutput = await productAdminFacade.checkProductStock({
            productId: PRODUCT_ID,
        });

        expect(productStockOutput).not.toBeNull();
        expect(productStockOutput.productId.value).toBe(PRODUCT_ID.value);
        expect(productStockOutput.stock).toBe(1000);
    });

    it("should successfully add a product", async () => {
        const productAdminFacade = ProductAdminFacadeFactory.create();

        await productAdminFacade.addProduct({
            id: PRODUCT_ID,
            name: "Water",
            description: "Fresh water for sale!",
            purchasePrice: 0.5,
            stock: 1000,
        });

        /**
         * The persistence layer is only accessed to make sure that persistence really worked.
         */
        const persistedProduct = await ProductModel.findOne({
            where: { id: PRODUCT_ID.value },
        });

        expect(persistedProduct).not.toBeNull();
    });
});
