import { CLIENT_1 } from "../mock/client.entity.mock";
import { AddClientUsecase } from "./add-client.usecase";

const MockRepository = () => ({
    add: jest.fn(),
    find: jest.fn(),
});

describe("AddClientUsecase Unit Tests", () => {
    it("should successfully add a client", async () => {
        const repository = MockRepository();

        const usecase = new AddClientUsecase(repository);

        await usecase.execute(CLIENT_1);

        expect(repository.add).toHaveBeenCalled();
    });
});
