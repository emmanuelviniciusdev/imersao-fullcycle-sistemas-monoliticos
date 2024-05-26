import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";
import { ClientEntity } from "./client.entity";
import { ProductEntityInterface } from "./product.entity.interface";

export interface OrderEntityInterface {
    id: Identifier;
    client: ClientEntity;
    products: ProductEntityInterface[];
    status: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    approve: () => void;
}
