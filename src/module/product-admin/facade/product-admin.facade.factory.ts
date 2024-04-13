import { ProductRepository } from "../repository/product.repository";
import { AddProductUsecase } from "../usecase/add-product.usecase";
import { ProductAdminFacade } from "./product-admin.facade";

export class ProductAdminFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();

        const addProductUsecase = new AddProductUsecase(productRepository);

        /**
         * TODO: Implement this usecase (it's one of the challenges).
         *
         * The tests for the repository, usecase and facade will also need to be implemented.
         */
        const checkProductStockUsecase: any = undefined;

        return new ProductAdminFacade({
            addProductUsecase,
            checkProductStockUsecase,
        });
    }
}
