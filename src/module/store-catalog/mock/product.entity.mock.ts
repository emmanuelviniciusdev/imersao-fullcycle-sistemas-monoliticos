import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ProductEntity } from "../domain/entity/product.entity";

export const PRODUCT_ENTITY_2_ID = new Identifier(
    "6755982c-3547-47ff-8b12-0cc86ed66d9f"
);

export const PRODUCT_ENTITY_1_ID = new Identifier(
    "f3a2e4c8-6b7d-4e6e-9c1e-8e0a7f5d2b3b"
);

export const PRODUCT_ENTITY_2 = new ProductEntity({
    id: PRODUCT_ENTITY_2_ID,
    name: "Fresh water",
    description: "Fresh water for sale!",
    salesPrice: 2.25,
    createdAt: new Date("2001-01-01"),
    updatedAt: new Date("2002-02-02"),
});

export const PRODUCT_ENTITY_1 = new ProductEntity({
    id: PRODUCT_ENTITY_1_ID,
    name: "Fresh water",
    description: "Fresh water for sale!",
    salesPrice: 2.25,
    createdAt: new Date("2001-01-01"),
    updatedAt: new Date("2002-02-02"),
});
