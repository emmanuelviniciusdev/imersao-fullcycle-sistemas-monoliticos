import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface FindClientOutputDTO {
    id: Identifier;
    name: string;
    email: string;
    address: string;
    updatedAt: Date;
    createdAt: Date;
}

export interface FindClientInputDTO {
    clientId: Identifier;
}
