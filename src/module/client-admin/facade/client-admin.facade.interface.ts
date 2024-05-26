import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface AddClientClientAdminFacadeInputDTO {
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

export interface FindClientClientAdminFacadeOutputDTO {
    id: Identifier;
    name: string;
    address: string;
    email: string;
    document?: string;
    street?: string;
    number?: string;
    complement?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    updatedAt: Date;
    createdAt: Date;
}

export interface FindClientClientAdminFacadeInputDTO {
    clientId: Identifier;
}

export interface ClientAdminFacadeInterface {
    add(input: AddClientClientAdminFacadeInputDTO): Promise<void>;
    find(
        input: FindClientClientAdminFacadeInputDTO,
    ): Promise<FindClientClientAdminFacadeOutputDTO>;
}
