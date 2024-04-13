import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { Product } from "../domain/entity/product.entity";
import { ProductRepository } from "./product.repository";
import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

async function _addProduct(): Promise<Identifier> {
    const productRepository = new ProductRepository();

    const productIdentifier = new Identifier(
        "f3a2e4c8-6b7d-4e6e-9c1e-8e0a7f5d2b3b"
    );

    const product = new Product({
        id: productIdentifier,
        name: "Water",
        description: "Fresh water for sale!",
        purchasePrice: 0.5,
        stock: 1000,
    });

    await productRepository.add(product);

    return productIdentifier;
}

describe("ProductRepository Unit Tests", () => {
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
        const productRepository = new ProductRepository();

        const productIdentifier = await _addProduct();

        const product = await productRepository.find(productIdentifier.value);

        expect(product).not.toBeNull();
        expect(product.id.value).toBe(productIdentifier.value);
    });

    it("should successfully add a product", async () => {
        const productIdentifier = await _addProduct();

        /**
         * The persistence layer is only accessed to make sure that persistence really worked.
         */
        const persistedProduct = await ProductModel.findOne({
            where: { id: productIdentifier.value },
        });

        expect(persistedProduct).not.toBeNull();
        expect(persistedProduct.id).toBe(productIdentifier.value);
    });
});
