import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface FindInvoiceFacadeInputDTO {
    idInvoice: Identifier;
}

export interface FindInvoiceFacadeOutputDTO {
    id: Identifier;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        complement?: string;
        zipCode?: string;
    };
    items: {
        id: Identifier;
        name: string;
        price: number;
        idInvoice: Identifier;
        createdAt: Date;
        updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface SaveInvoiceFacadeInputDTO {
    id?: Identifier;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        complement?: string;
        zipCode?: string;
    };
    items: {
        id?: Identifier;
        name: string;
        price: number;
        idInvoice: Identifier;
        createdAt?: Date;
        updatedAt?: Date;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SaveInvoiceFacadeOutputDTO {
    id: Identifier;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        complement?: string;
        zipCode?: string;
    };
    items: {
        id: Identifier;
        name: string;
        price: number;
        idInvoice: Identifier;
        createdAt: Date;
        updatedAt: Date;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

export interface InvoiceFacadeInterface {
    find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
    save(input: SaveInvoiceFacadeInputDTO): Promise<SaveInvoiceFacadeOutputDTO>;
}
