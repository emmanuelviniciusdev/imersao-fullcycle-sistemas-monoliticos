import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

interface ProductEntityFindAllProductsInterface {
    id: Identifier;
    name: string;
    description: string;
    salesPrice: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface FindAllProductsUsecaseInputDTO {}

export interface FindAllProductsUsecaseOutputDTO {
    products: ProductEntityFindAllProductsInterface[];
}
