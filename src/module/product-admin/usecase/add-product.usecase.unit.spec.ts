import { AddProductInputDTO } from "./add-product.dto";
import { AddProductUsecase } from "./add-product.usecase";

const MockProductRepository = () => ({
    add: jest.fn(),
    find: jest.fn(),
});

describe("AddProductUsecase Unit Tests", () => {
    it("should successfully add a product", async () => {
        const repository = MockProductRepository();
        const usecase = new AddProductUsecase(repository);

        const inputDTO: AddProductInputDTO = {
            name: "Water",
            description: "Fresh water for sale!",
            purchasePrice: 0.5,
            stock: 1000,
        };

        const outputDTO = await usecase.execute(inputDTO);

        expect(repository.add).toHaveBeenCalled();
        expect(outputDTO.id).toBeDefined();
    });
});
