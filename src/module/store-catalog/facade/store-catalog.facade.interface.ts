import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

interface ProductEntityStoreCatalog {
    id: Identifier;
    name: string;
    description: string;
    salesPrice: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface FindProductStoreCatalogFacadeInputDTO {
    productId: Identifier;
}

export interface FindProductStoreCatalogFacadeOutputDTO
    extends Partial<ProductEntityStoreCatalog> {}

export interface FindAllProductsStoreCatalogFacadeOutputDTO {
    products: ProductEntityStoreCatalog[];
}

export interface StoreCatalogFacadeInterface {
    find(
        productId: Identifier
    ): Promise<FindProductStoreCatalogFacadeOutputDTO>;
    findAll(): Promise<FindAllProductsStoreCatalogFacadeOutputDTO>;
}
