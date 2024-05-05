import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import { ProductGateway } from "../gateway/product.gateway";
import {
    FindAllProductsUsecaseInputDTO,
    FindAllProductsUsecaseOutputDTO,
} from "./find-all-products.usecase.dto";

export class FindAllProductsUsecase
    implements
        UsecaseInterface<
            FindAllProductsUsecaseInputDTO,
            FindAllProductsUsecaseOutputDTO
        >
{
    private _repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._repository = repository;
    }

    async execute(
        _: FindAllProductsUsecaseInputDTO,
    ): Promise<FindAllProductsUsecaseOutputDTO> {
        const products = await this._repository.findAll();
        return { products };
    }
}
