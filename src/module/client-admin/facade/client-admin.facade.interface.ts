import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface AddClientClientAdminFacadeInputDTO {
    id?: Identifier;
    name: string;
    email: string;
    address: string;
    updatedAt?: Date;
    createdAt?: Date;
}

export interface FindClientClientAdminFacadeOutputDTO {
    id: Identifier;
    name: string;
    email: string;
    address: string;
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
