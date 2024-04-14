import { UsecaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import {
    AddProductInputDTO,
    AddProductOutputDTO,
} from "../usecase/add-product.usecase.dto";
import {
    CheckProductStockInputDTO,
    CheckProductStockOutputDTO,
} from "../usecase/check-product-stock.usecase.dto";
import {
    AddProductFacadeInputDTO,
    CheckProductStockFacadeInputDTO,
    CheckProductStockFacadeOutputDTO,
    ProductAdminFacadeInterface,
} from "./product-admin.facade.interface";

type ProductAdminFacadeProps = {
    addProductUsecase: UsecaseInterface<
        AddProductInputDTO,
        AddProductOutputDTO
    >;
    checkProductStockUsecase: UsecaseInterface<
        CheckProductStockInputDTO,
        Partial<CheckProductStockOutputDTO>
    >;
};

export class ProductAdminFacade implements ProductAdminFacadeInterface {
    private _addProductUsecase: UsecaseInterface<
        AddProductInputDTO,
        AddProductOutputDTO
    >;
    private _checkProductStockUsecase: UsecaseInterface<
        CheckProductStockInputDTO,
        Partial<CheckProductStockOutputDTO>
    >;

    constructor(props: ProductAdminFacadeProps) {
        this._addProductUsecase = props.addProductUsecase;
        this._checkProductStockUsecase = props.checkProductStockUsecase;
    }

    async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
        await this._addProductUsecase.execute(input);
    }

    async checkProductStock(
        input: CheckProductStockFacadeInputDTO
    ): Promise<Partial<CheckProductStockFacadeOutputDTO>> {
        return await this._checkProductStockUsecase.execute(input);
    }
}
