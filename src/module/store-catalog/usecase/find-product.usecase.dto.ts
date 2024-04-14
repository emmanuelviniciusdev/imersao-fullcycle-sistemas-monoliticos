import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

interface ProductEntityFindProductInterface {
    id: Identifier;
    name: string;
    description: string;
    salesPrice: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface FindProductInputDTO {
    productId: Identifier;
}

export interface FindProductOutputDTO
    extends Partial<ProductEntityFindProductInterface> {}
