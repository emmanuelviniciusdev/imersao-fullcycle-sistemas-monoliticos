import { UsecaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import { ProductGateway } from "../gateway/product.gateway";
import {
    FindProductInputDTO,
    FindProductOutputDTO,
} from "./find-product.usecase.dto";

export class FindProductUsecase
    implements UsecaseInterface<FindProductInputDTO, FindProductOutputDTO>
{
    private _repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._repository = repository;
    }

    async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
        return await this._repository.find(input.productId);
    }
}
