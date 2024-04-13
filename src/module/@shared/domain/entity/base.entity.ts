import { Identifier } from "../value-object/identifier.value-object";

export class BaseEntity {
    private _id: Identifier;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(_id?: Identifier) {
        this._id = _id || new Identifier();
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get id(): Identifier {
        return this._id;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set createdAt(_createdAt: Date) {
        this._createdAt = _createdAt;
    }

    set updatedAt(_updatedAt: Date) {
        this._updatedAt = _updatedAt;
    }

    setTimestamps(createdAt?: Date, updatedAt?: Date) {
        if (createdAt) {
            this.createdAt = createdAt;
        }

        if (updatedAt) {
            this.updatedAt = updatedAt;
        }
    }
}
