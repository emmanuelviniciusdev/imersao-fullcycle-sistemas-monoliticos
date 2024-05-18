import { ValueObject } from "./value-object.interface";

export class Address implements ValueObject {
    constructor(
        public street: string,
        public number: string,
        public city: string,
        public state: string,
        public complement?: string,
        public zipCode?: string,
    ) {}
}
