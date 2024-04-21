import { AggregateRoot } from "../../@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ClientEntityInterface } from "./client.entity.interface";

type ClientEntityProps = {
    id?: Identifier;
    name: string;
    email: string;
    address: string;
    updatedAt?: Date;
    createdAt?: Date;
};

export class ClientEntity
    extends BaseEntity
    implements AggregateRoot, ClientEntityInterface
{
    private _name: string;
    private _email: string;
    private _address: string;

    constructor(props: ClientEntityProps) {
        super(props.id);

        this._name = props.name;
        this._email = props.email;
        this._address = props.address;

        this.setTimestamps(props.createdAt, props.updatedAt);
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get address() {
        return this._address;
    }
}
