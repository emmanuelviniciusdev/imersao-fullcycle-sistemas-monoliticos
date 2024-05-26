import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";
import { ClientEntity } from "./client.entity";
import { ProductEntityInterface } from "./product.entity.interface";

type OrderEntityProps = {
    id?: Identifier;
    client: ClientEntity;
    products: ProductEntityInterface[];
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class OrderEntity extends BaseEntity {
    private _client: ClientEntity;
    private _products: ProductEntityInterface[];
    private _status: string;

    constructor(props: OrderEntityProps) {
        super(props.id);

        this._client = props.client;
        this._products = props.products;
        this._status = props.status || "pending";

        this.setTimestamps(props.createdAt, props.updatedAt);
    }

    approve(): void {
        this._status = "approved";
    }

    get total(): number {
        return this.products.reduce(
            (salesPriceAcc, product) => product.salesPrice + salesPriceAcc,
            0,
        );
    }

    get client() {
        return this._client;
    }

    get products() {
        return this._products;
    }

    get status() {
        return this._status;
    }
}
