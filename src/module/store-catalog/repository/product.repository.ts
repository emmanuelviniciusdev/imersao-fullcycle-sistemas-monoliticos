import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ProductEntity } from "../domain/entity/product.entity";
import { ProductEntityInterface } from "../domain/entity/product.entity.interface";
import { ProductGateway } from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export class ProductRepository implements ProductGateway {
    async find(
        productId: Identifier,
    ): Promise<Partial<ProductEntityInterface>> {
        const persistedProduct = await ProductModel.findOne({
            where: { id: productId.value },
        });

        if (!persistedProduct) {
            return null;
        }

        const productEntity = new ProductEntity({
            id: new Identifier(persistedProduct.id),
            name: persistedProduct.name,
            description: persistedProduct.description,
            salesPrice: persistedProduct.salesPrice,
            createdAt: persistedProduct.createdAt,
            updatedAt: persistedProduct.updatedAt,
        });

        return productEntity;
    }

    async findAll(): Promise<ProductEntityInterface[]> {
        const persistedProducts = await ProductModel.findAll();

        const productEntities = persistedProducts.map(
            (persistedProduct) =>
                new ProductEntity({
                    id: new Identifier(persistedProduct.id),
                    name: persistedProduct.name,
                    description: persistedProduct.description,
                    salesPrice: persistedProduct.salesPrice,
                    createdAt: persistedProduct.createdAt,
                    updatedAt: persistedProduct.updatedAt,
                }),
        );

        return productEntities;
    }
}
