import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";

export interface ProductEntityInterface {
    id: Identifier;
    name: string;
    description: string;
    salesPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
