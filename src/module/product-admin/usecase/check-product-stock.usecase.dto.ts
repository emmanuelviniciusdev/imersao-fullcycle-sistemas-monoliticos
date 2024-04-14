import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface CheckProductStockInputDTO {
    productId: Identifier;
}

export interface CheckProductStockOutputDTO {
    productId: Identifier;
    stock: number;
}
