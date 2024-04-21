import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ClientEntityInterface } from "../domain/client.entity.interface";

export interface ClientGateway {
    add(client: ClientEntityInterface): Promise<void>;
    find(clientId: Identifier): Promise<Partial<ClientEntityInterface>>;
}
