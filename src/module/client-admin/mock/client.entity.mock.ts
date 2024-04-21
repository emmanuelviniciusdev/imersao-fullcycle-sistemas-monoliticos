import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";

export const CLIENT_1_IDENTIFIER = new Identifier(
    "9c1335f9-75a8-4c72-9de5-c4c4e5c8fc29",
);

export const CLIENT_1 = {
    id: CLIENT_1_IDENTIFIER,
    name: "Hayley",
    email: "hayley.1988@icloud.com",
    address: "Nashville, Tennessee, USA",
    createdAt: new Date("2001-01-01"),
    updatedAt: new Date("2002-02-02"),
};
