import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";

export interface ProductEntityInterface {
    id: Identifier;
    name: string;
    description: string;
    salesPrice: number;
    updatedAt: Date;
    createdAt: Date;
}
