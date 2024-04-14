import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import {
    PRODUCT_ENTITY_1,
    PRODUCT_ENTITY_1_ID,
    PRODUCT_ENTITY_2,
    PRODUCT_ENTITY_2_ID,
} from "../mock/product.entity.mock";
import { StoreCatalogFacadeFactory } from "./store-catalog.facade.factory";

describe("StoreCatalogFacade Integration Tests", () => {
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

    it("should successfully find a product", async () => {
        await ProductModel.create({
            id: PRODUCT_ENTITY_1.id.value,
            name: PRODUCT_ENTITY_1.name,
            description: PRODUCT_ENTITY_1.description,
            salesPrice: PRODUCT_ENTITY_1.salesPrice,
            createdAt: PRODUCT_ENTITY_1.createdAt,
            updatedAt: PRODUCT_ENTITY_1.updatedAt,
        });

        const storeCatalogFacade = StoreCatalogFacadeFactory.create();

        const product = await storeCatalogFacade.find(PRODUCT_ENTITY_1_ID);

        expect(product).not.toBeNull();

        expect(product.id.value).toBe(PRODUCT_ENTITY_1_ID.value);
    });

    it("should successfully find all products", async () => {
        for (const productEntityMock of [PRODUCT_ENTITY_1, PRODUCT_ENTITY_2]) {
            await ProductModel.create({
                id: productEntityMock.id.value,
                name: productEntityMock.name,
                description: productEntityMock.description,
                salesPrice: productEntityMock.salesPrice,
                createdAt: productEntityMock.createdAt,
                updatedAt: productEntityMock.updatedAt,
            });
        }

        const storeCatalogFacade = StoreCatalogFacadeFactory.create();

        const { products } = await storeCatalogFacade.findAll();

        expect(products).toHaveLength(2);

        expect(products[0].id.value).toBe(PRODUCT_ENTITY_1_ID.value);
        expect(products[1].id.value).toBe(PRODUCT_ENTITY_2_ID.value);
    });
});
