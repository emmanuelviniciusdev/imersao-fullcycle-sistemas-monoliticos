import { ProductRepository } from "../repository/product.repository";
import { FindAllProductsUsecase } from "../usecase/find-all-products.usecase";
import { FindProductUsecase } from "../usecase/find-product.usecase";
import { StoreCatalogFacade } from "./store-catalog.facade";

export class StoreCatalogFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();

        const findProductUsecase = new FindProductUsecase(productRepository);
        const findAllProductsUsecase = new FindAllProductsUsecase(
            productRepository,
        );

        return new StoreCatalogFacade({
            findProductUsecase,
            findAllProductsUsecase,
        });
    }
}
