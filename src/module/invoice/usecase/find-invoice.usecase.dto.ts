import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface FindInvoiceUsecaseInputDTO {
    idInvoice: Identifier;
}

export interface FindInvoiceUsecaseOutputDTO {
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
