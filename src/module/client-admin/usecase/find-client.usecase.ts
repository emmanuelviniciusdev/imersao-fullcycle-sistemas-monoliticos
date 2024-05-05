import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import { ClientGateway } from "../gateway/client.gateway";
import {
    FindClientInputDTO,
    FindClientOutputDTO,
} from "./find-client.usecase.dto";

export class FindClientUsecase
    implements
        UsecaseInterface<FindClientInputDTO, Partial<FindClientOutputDTO>>
{
    private _repository: ClientGateway;

    constructor(repository: ClientGateway) {
        this._repository = repository;
    }

    async execute(
        input: FindClientInputDTO,
    ): Promise<Partial<FindClientOutputDTO>> {
        return await this._repository.find(input.clientId);
    }
}
