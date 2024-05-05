import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import { AddClientInputDTO } from "../usecase/add-client.usecase.dto";
import {
    FindClientInputDTO,
    FindClientOutputDTO,
} from "../usecase/find-client.usecase.dto";
import {
    AddClientClientAdminFacadeInputDTO,
    ClientAdminFacadeInterface,
    FindClientClientAdminFacadeInputDTO,
    FindClientClientAdminFacadeOutputDTO,
} from "./client-admin.facade.interface";

export class ClientAdminFacade implements ClientAdminFacadeInterface {
    private _addClientUsecase: UsecaseInterface<AddClientInputDTO, void>;
    private _findClientUsecase: UsecaseInterface<
        FindClientInputDTO,
        Partial<FindClientOutputDTO>
    >;

    constructor(
        addClientUsecase: UsecaseInterface<AddClientInputDTO, void>,
        findClientUsecase: UsecaseInterface<
            FindClientInputDTO,
            Partial<FindClientOutputDTO>
        >,
    ) {
        this._addClientUsecase = addClientUsecase;
        this._findClientUsecase = findClientUsecase;
    }

    async add(input: AddClientClientAdminFacadeInputDTO): Promise<void> {
        await this._addClientUsecase.execute({
            id: input.id,
            name: input.name,
            email: input.email,
            address: input.address,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });
    }

    async find(
        input: FindClientClientAdminFacadeInputDTO,
    ): Promise<FindClientClientAdminFacadeOutputDTO> {
        const output = await this._findClientUsecase.execute({
            clientId: input.clientId,
        });

        if (!output) {
            return null;
        }

        return {
            id: output.id,
            name: output.name,
            email: output.email,
            address: output.address,
            createdAt: output.createdAt,
            updatedAt: output.updatedAt,
        };
    }
}
