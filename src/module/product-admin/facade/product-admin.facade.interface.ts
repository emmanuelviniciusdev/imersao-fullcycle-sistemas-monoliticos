import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface AddProductFacadeInputDTO {
    id?: Identifier;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    updatedAt?: Date;
    createdAt?: Date;
}

export interface CheckProductStockFacadeInputDTO {
    productId: Identifier;
}

export interface CheckProductStockFacadeOutputDTO {
    productId: Identifier;
    stock: number;
}

export interface ProductAdminFacadeInterface {
    addProduct(input: AddProductFacadeInputDTO): Promise<void>;
    checkProductStock(
        input: CheckProductStockFacadeInputDTO,
    ): Promise<Partial<CheckProductStockFacadeOutputDTO>>;
}
