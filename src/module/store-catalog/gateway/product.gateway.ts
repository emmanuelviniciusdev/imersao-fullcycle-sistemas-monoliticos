import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ProductEntityInterface } from "../domain/entity/product.entity.interface";

export interface ProductGateway {
    find(productId: Identifier): Promise<Partial<ProductEntityInterface>>;
    findAll(): Promise<ProductEntityInterface[]>;
}
