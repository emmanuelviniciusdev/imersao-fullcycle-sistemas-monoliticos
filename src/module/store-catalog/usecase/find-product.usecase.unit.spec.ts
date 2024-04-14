import {
    PRODUCT_ENTITY_1,
    PRODUCT_ENTITY_1_ID,
} from "../mock/product.entity.mock";
import { FindProductUsecase } from "./find-product.usecase";

const MockRepository = () => ({
    find: jest.fn().mockReturnValue(Promise.resolve(PRODUCT_ENTITY_1)),
    findAll: jest.fn(),
});

describe("FindProductUsecase Unit Tests", () => {
    it("should successfully retrieve a single product", async () => {
        const repository = MockRepository();

        const usecase = new FindProductUsecase(repository);

        const output = await usecase.execute({
            productId: PRODUCT_ENTITY_1_ID,
        });

        expect(repository.find).toHaveBeenCalled();

        expect(output).not.toBeNull();

        expect(output.id.value).toBe(PRODUCT_ENTITY_1_ID.value);
    });
});
