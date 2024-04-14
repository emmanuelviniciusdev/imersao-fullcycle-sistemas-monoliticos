import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export interface AddProductInputDTO {
    id?: Identifier;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    updatedAt?: Date;
    createdAt?: Date;
}

export interface AddProductOutputDTO {
    id: Identifier;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}
