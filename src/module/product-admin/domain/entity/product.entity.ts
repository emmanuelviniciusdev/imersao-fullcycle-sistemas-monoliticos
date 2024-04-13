import { AggregateRoot } from "../../../@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";

type ProductProps = {
    id?: Identifier;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    updatedAt?: Date;
    createdAt?: Date;
};

export class Product extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _description: string;
    private _purchasePrice: number;
    private _stock: number;

    constructor(props: ProductProps) {
        super(props.id);

        this._name = props.name;
        this._description = props.description;
        this._purchasePrice = props.purchasePrice;
        this._stock = props.stock;

        this.setTimestamps(props.createdAt, props.updatedAt);
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get purchasePrice() {
        return this._purchasePrice;
    }

    get stock() {
        return this._stock;
    }

    set name(_name: string) {
        this._name = _name;
    }

    set description(_description: string) {
        this._description = _description;
    }

    set purchasePrice(_purchasePrice: number) {
        this._purchasePrice = _purchasePrice;
    }

    set stock(_stock: number) {
        this._stock = _stock;
    }
}
