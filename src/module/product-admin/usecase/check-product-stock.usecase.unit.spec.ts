import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { CheckProductStockUsecase } from "./check-product-stock.usecase";

const PRODUCT_ID = new Identifier("f3a2e4c8-6b7d-4e6e-9c1e-8e0a7f5d2b3b");

const MockProductRepository = () => ({
    add: jest.fn(),
    find: jest.fn().mockImplementation(() => {
        return Promise.resolve({
            productId: PRODUCT_ID,
            stock: 15,
        });
    }),
});

describe("CheckProductStockUsecase Unit Tests", () => {
    it("should successfully retrieve the stock number of a product", async () => {
        const repository = MockProductRepository();
        const usecase = new CheckProductStockUsecase(repository);

        const outputDTO = await usecase.execute({ productId: PRODUCT_ID });

        expect(repository.find).toHaveBeenCalled();

        expect(outputDTO.productId.value).toBe(PRODUCT_ID.value);
        expect(outputDTO.stock).toBe(15);
    });
});
