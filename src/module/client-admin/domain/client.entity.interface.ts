import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface ClientEntityInterface {
    id?: Identifier;
    name: string;
    email: string;
    address: string;
    document?: string;
    street?: string;
    number?: string;
    complement?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    updatedAt?: Date;
    createdAt?: Date;
}
