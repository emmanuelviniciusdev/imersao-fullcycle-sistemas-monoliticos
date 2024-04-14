import { UsecaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import { ProductGateway } from "../gateway/product.gateway";
import {
    CheckProductStockInputDTO,
    CheckProductStockOutputDTO,
} from "./check-product-stock.usecase.dto";

export class CheckProductStockUsecase
    implements
        UsecaseInterface<
            CheckProductStockInputDTO,
            Partial<CheckProductStockOutputDTO>
        >
{
    private _repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._repository = repository;
    }

    async execute(
        input: CheckProductStockInputDTO
    ): Promise<Partial<CheckProductStockOutputDTO>> {
        const product = await this._repository.find(input.productId.value);

        if (!product) {
            return null;
        }

        return {
            productId: input.productId,
            stock: product.stock,
        };
    }
}
