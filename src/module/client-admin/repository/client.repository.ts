import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ClientEntity } from "../domain/client.entity";
import { ClientEntityInterface } from "../domain/client.entity.interface";
import { ClientGateway } from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export class ClientRepository implements ClientGateway {
    async find(clientId: Identifier): Promise<Partial<ClientEntityInterface>> {
        const persistedClient = await ClientModel.findOne({
            where: { id: clientId.value },
        });

        if (!persistedClient) {
            return null;
        }

        const client = new ClientEntity({
            id: new Identifier(persistedClient.id),
            name: persistedClient.name,
            email: persistedClient.email,
            address: persistedClient.address,
            createdAt: persistedClient.createdAt,
            updatedAt: persistedClient.updatedAt,
        });

        return client;
    }

    async add(client: ClientEntityInterface): Promise<void> {
        await ClientModel.create({
            id: client.id.value,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        });
    }
}
