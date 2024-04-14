import {
    PRODUCT_ENTITY_1,
    PRODUCT_ENTITY_2,
} from "../mock/product.entity.mock";
import { FindAllProductsUsecase } from "./find-all-products.usecase";

const MockRepository = () => ({
    find: jest.fn(),
    findAll: jest
        .fn()
        .mockReturnValue(Promise.resolve([PRODUCT_ENTITY_1, PRODUCT_ENTITY_2])),
});

describe("FindAllProductsUsecase Unit Tests", () => {
    it("should successfully retrieve all products", async () => {
        const repository = MockRepository();

        const usecase = new FindAllProductsUsecase(repository);

        const output = await usecase.execute({});

        expect(repository.findAll).toHaveBeenCalled();

        expect(output.products.length).toBe(2);

        expect(output.products[0].id.value).toBe(PRODUCT_ENTITY_1.id.value);
        expect(output.products[1].id.value).toBe(PRODUCT_ENTITY_2.id.value);
    });
});
