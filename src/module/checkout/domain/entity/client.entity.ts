import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import { Identifier } from "../../../@shared/domain/value-object/identifier.value-object";

type ClientEntityProps = {
    id?: Identifier;
    name: string;
    email: string;
    address: string;
    document?: string;
    street?: string;
    number?: string;
    complement?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export class ClientEntity extends BaseEntity {
    private _name: string;
    private _document: string;
    private _email: string;
    private _address: string;
    private _street?: string;
    private _number?: string;
    private _complement?: string;
    private _city?: string;
    private _state?: string;
    private _zipCode?: string;

    constructor(props: ClientEntityProps) {
        super(props.id);

        this._name = props.name;
        this._document = props.document;
        this._email = props.email;
        this._address = props.address;
        this._street = props.street;
        this._number = props.number;
        this._complement = props.complement;
        this._city = props.city;
        this._state = props.state;
        this._zipCode = props.zipCode;

        this.setTimestamps(props.createdAt, props.updatedAt);
    }

    get name() {
        return this._name;
    }

    get document() {
        return this._document;
    }

    get email() {
        return this._email;
    }

    get address() {
        return this._address;
    }

    get street() {
        return this._street;
    }

    get number() {
        return this._number;
    }

    get complement() {
        return this._complement;
    }

    get city() {
        return this._city;
    }

    get state() {
        return this._state;
    }

    get zipCode() {
        return this._zipCode;
    }
}
