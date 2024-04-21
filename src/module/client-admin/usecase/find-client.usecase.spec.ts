import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ClientEntity } from "../domain/client.entity";
import { CLIENT_1, CLIENT_1_IDENTIFIER } from "../mock/client.entity.mock";
import { FindClientUsecase } from "./find-client.usecase";

const MockRepository = () => ({
    add: jest.fn(),
    find: jest.fn().mockReturnValue(new ClientEntity(CLIENT_1)),
});

describe("FindClientUsecase Unit Tests", () => {
    it("should successfully find a client", async () => {
        const repository = MockRepository();

        const usecase = new FindClientUsecase(repository);

        const clientId = CLIENT_1_IDENTIFIER;

        const foundClient = await usecase.execute({
            clientId,
        });

        expect(repository.find).toHaveBeenCalled();

        expect(foundClient).not.toBeNull();

        expect(foundClient.id.value).toBe(clientId.value);
    });
});
