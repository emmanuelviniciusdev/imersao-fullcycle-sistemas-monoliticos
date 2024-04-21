import { UsecaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import {
    FindAllProductsUsecaseInputDTO,
    FindAllProductsUsecaseOutputDTO,
} from "../usecase/find-all-products.usecase.dto";
import {
    FindProductInputDTO,
    FindProductOutputDTO,
} from "../usecase/find-product.usecase.dto";
import {
    FindAllProductsStoreCatalogFacadeOutputDTO,
    FindProductStoreCatalogFacadeOutputDTO,
    StoreCatalogFacadeInterface,
} from "./store-catalog.facade.interface";

type StoreCatalogFacadeProps = {
    findProductUsecase: UsecaseInterface<
        FindProductInputDTO,
        FindProductOutputDTO
    >;
    findAllProductsUsecase: UsecaseInterface<
        FindAllProductsUsecaseInputDTO,
        FindAllProductsUsecaseOutputDTO
    >;
};

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private _findProductUsecase: UsecaseInterface<
        FindProductInputDTO,
        FindProductOutputDTO
    >;

    private _findAllProductsUsecase: UsecaseInterface<
        FindAllProductsUsecaseInputDTO,
        FindAllProductsUsecaseOutputDTO
    >;

    constructor(props: StoreCatalogFacadeProps) {
        this._findProductUsecase = props.findProductUsecase;
        this._findAllProductsUsecase = props.findAllProductsUsecase;
    }

    async find(
        productId: Identifier,
    ): Promise<FindProductStoreCatalogFacadeOutputDTO> {
        return await this._findProductUsecase.execute({
            productId,
        });
    }

    async findAll(): Promise<FindAllProductsStoreCatalogFacadeOutputDTO> {
        return this._findAllProductsUsecase.execute({});
    }
}
