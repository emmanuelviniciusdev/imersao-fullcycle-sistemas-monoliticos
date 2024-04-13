import { Product } from "../domain/entity/product.entity";
import { ProductGateway } from "../gateway/product.gateway";
import { AddProductInputDTO, AddProductOutputDTO } from "./add-product.dto";

export class AddProductUsecase {
    private _repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._repository = repository;
    }

    async execute(inputDTO: AddProductInputDTO): Promise<AddProductOutputDTO> {
        const product = new Product({
            id: inputDTO.id,
            name: inputDTO.name,
            description: inputDTO.description,
            purchasePrice: inputDTO.purchasePrice,
            stock: inputDTO.stock,
            createdAt: inputDTO.createdAt,
            updatedAt: inputDTO.updatedAt,
        });

        await this._repository.add(product);

        const outputDTO: AddProductOutputDTO = {
            id: product.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };

        return outputDTO;
    }
}
