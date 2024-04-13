import { Product } from "../domain/entity/product.entity";

export interface ProductGateway {
    add(product: Product): Promise<void>;
    find(IDValue: string): Promise<Partial<Product>>;
}
