import { v4 as uuidv4 } from "uuid";
import { ValueObject } from "./value-object.interface";

export class Identifier implements ValueObject {
    private _value: string;

    constructor(_value?: string) {
        this._value = _value || uuidv4();
    }

    get value(): string {
        return this._value;
    }
}
