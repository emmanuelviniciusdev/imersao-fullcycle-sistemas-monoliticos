import { ClientRepository } from "../repository/client.repository";
import { AddClientUsecase } from "../usecase/add-client.usecase";
import { FindClientUsecase } from "../usecase/find-client.usecase";
import { ClientAdminFacade } from "./client-admin.facade";

export class ClientAdminFacadeFactory {
    static create() {
        const clientRepository = new ClientRepository();

        const addClientUsecase = new AddClientUsecase(clientRepository);
        const findClientUsecase = new FindClientUsecase(clientRepository);

        return new ClientAdminFacade(addClientUsecase, findClientUsecase);
    }
}
