import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface ClientEntityInterface {
    id?: Identifier;
    name: string;
    email: string;
    address: string;
    updatedAt?: Date;
    createdAt?: Date;
}
