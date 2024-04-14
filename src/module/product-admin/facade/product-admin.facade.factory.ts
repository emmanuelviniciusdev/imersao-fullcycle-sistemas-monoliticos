import { ProductRepository } from "../repository/product.repository";
import { AddProductUsecase } from "../usecase/add-product.usecase";
import { CheckProductStockUsecase } from "../usecase/check-product-stock.usecase";
import { ProductAdminFacade } from "./product-admin.facade";

export class ProductAdminFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();

        const addProductUsecase = new AddProductUsecase(productRepository);
        const checkProductStockUsecase = new CheckProductStockUsecase(
            productRepository
        );

        return new ProductAdminFacade({
            addProductUsecase,
            checkProductStockUsecase,
        });
    }
}
