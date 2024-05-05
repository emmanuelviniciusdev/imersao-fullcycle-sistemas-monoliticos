import { AggregateRoot } from "../../@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export type TransactionStatus = "pending" | "approved" | "declined";

type TransactionProps = {
    id?: Identifier;
    amount: number;
    orderId: Identifier;
    status?: TransactionStatus;
    createdAt?: Date;
    updatedAt?: Date;
};

export class TransactionEntity extends BaseEntity implements AggregateRoot {
    private _amount: number;
    private _orderId: Identifier;
    private _status: TransactionStatus;

    constructor(props: TransactionProps) {
        super(props.id);

        this._amount = props.amount;
        this._orderId = props.orderId;
        this._status = props.status || "pending";

        this.setTimestamps(props.createdAt, props.updatedAt);

        this.validate();
    }

    get amount() {
        return this._amount;
    }

    get orderId() {
        return this._orderId;
    }

    get status() {
        return this._status;
    }

    process() {
        if (this._amount >= 100) {
            this.approve();
        } else {
            this.decline();
        }
    }

    approve() {
        this._status = "approved";
    }

    decline() {
        this._status = "declined";
    }

    validate() {
        if (this._amount <= 0) {
            throw new Error("Amount must be greater than 0");
        }
    }
}
