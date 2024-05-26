import { AggregateRoot } from "../../../@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";

type ProductEntityProps = {
    id?: Identifier;
    name: string;
    description: string;
    salesPrice: number;
    createdAt?: Date;
    updatedAt?: Date;
};

export class ProductEntity extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _description: string;
    private _salesPrice: number;

    constructor(props: ProductEntityProps) {
        super(props.id);

        this._name = props.name;
        this._description = props.description;
        this._salesPrice = props.salesPrice;

        this.setTimestamps(props.createdAt, props.updatedAt);
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get salesPrice() {
        return this._salesPrice;
    }
}
