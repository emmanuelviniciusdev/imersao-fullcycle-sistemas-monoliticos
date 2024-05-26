import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ProductEntityInterface } from "../domain/entity/product.entity.interface";

export type ProductReference = { productId: Identifier };

export interface PlaceOrderUsecaseInputDTO {
    clientId: Identifier;
    products: ProductReference[];
}

export interface PlaceOrderUsecaseOutputDTO {
    orderId: Identifier;
    invoiceId: Identifier;
    status: string;
    total: number;
    products: ProductEntityInterface[];
}
