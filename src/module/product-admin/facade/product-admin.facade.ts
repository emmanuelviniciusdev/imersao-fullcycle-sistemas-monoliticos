import { UsecaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import {
    AddProductInputDTO,
    AddProductOutputDTO,
} from "../usecase/add-product.dto";
import {
    AddProductFacadeInputDTO,
    CheckProductStockFacadeInputDTO,
    CheckProductStockFacadeOutputDTO,
    ProductAdminFacadeInterface,
} from "./product-admin.facade.interface";

export interface ProductAdminFacadeProps {
    addProductUsecase: UsecaseInterface<
        AddProductInputDTO,
        AddProductOutputDTO
    >;
    checkProductStockUsecase: UsecaseInterface<any, any>;
}

export class ProductAdminFacade implements ProductAdminFacadeInterface {
    private _addProductUsecase: UsecaseInterface<
        AddProductInputDTO,
        AddProductOutputDTO
    >;
    private _checkProductStockUsecase: UsecaseInterface<any, any>;

    constructor(props: ProductAdminFacadeProps) {
        this._addProductUsecase = props.addProductUsecase;
        this._checkProductStockUsecase = props.checkProductStockUsecase;
    }

    async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
        await this._addProductUsecase.execute(input);
    }

    async checkProductStock(
        input: CheckProductStockFacadeInputDTO
    ): Promise<CheckProductStockFacadeOutputDTO> {
        return await this._checkProductStockUsecase.execute(input);
    }
}
