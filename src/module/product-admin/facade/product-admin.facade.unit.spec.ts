import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { AddProductUsecase } from "../usecase/add-product.usecase";
import { ProductRepository } from "../repository/product.repository";
import { ProductAdminFacade } from "./product-admin.facade";
import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ProductAdminFacadeFactory } from "./product-admin.facade.factory";

describe("ProductAdminFacade Unit Tests", () => {
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

    it("should successfully add a product", async () => {
        const productAdminFacade = ProductAdminFacadeFactory.create();

        const productIdentifier = new Identifier(
            "f3a2e4c8-6b7d-4e6e-9c1e-8e0a7f5d2b3b"
        );

        await productAdminFacade.addProduct({
            id: productIdentifier,
            name: "Water",
            description: "Fresh water for sale!",
            purchasePrice: 0.5,
            stock: 1000,
        });

        /**
         * The persistence layer is only accessed to make sure that persistence really worked.
         */
        const persistedProduct = await ProductModel.findOne({
            where: { id: productIdentifier.value },
        });

        expect(persistedProduct).not.toBeNull();
    });
});
