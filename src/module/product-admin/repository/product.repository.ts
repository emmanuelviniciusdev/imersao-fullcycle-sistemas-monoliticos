import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { Product } from "../domain/entity/product.entity";
import { ProductGateway } from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export class ProductRepository implements ProductGateway {
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.value,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    }

    async find(IDValue: string): Promise<Partial<Product>> {
        const persistedProduct = await ProductModel.findOne({
            where: { id: IDValue },
        });

        if (!persistedProduct) {
            return;
        }

        const product = new Product({
            id: new Identifier(persistedProduct.id),
            name: persistedProduct.name,
            description: persistedProduct.description,
            purchasePrice: persistedProduct.purchasePrice,
            stock: persistedProduct.stock,
            createdAt: persistedProduct.createdAt,
            updatedAt: persistedProduct.updatedAt,
        });

        return product;
    }
}
