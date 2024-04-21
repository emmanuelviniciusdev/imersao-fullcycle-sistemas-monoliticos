import { UsecaseInterface } from "../../@shared/domain/usecase/usecase.interface";
import { ClientGateway } from "../gateway/client.gateway";
import { AddClientInputDTO } from "./add-client.usecase.dto";

export class AddClientUsecase
    implements UsecaseInterface<AddClientInputDTO, void>
{
    private _repository: ClientGateway;

    constructor(repository: ClientGateway) {
        this._repository = repository;
    }

    async execute(input: AddClientInputDTO): Promise<void> {
        await this._repository.add(input);
    }
}
