import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { ClientRepository } from "./client.repository";
import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { ClientEntity } from "../domain/client.entity";
import { CLIENT_1, CLIENT_1_IDENTIFIER } from "../mock/client.entity.mock";

async function _addClient(): Promise<Identifier> {
    const clientRepository = new ClientRepository();

    const client = new ClientEntity(CLIENT_1);

    await clientRepository.add(client);

    return CLIENT_1_IDENTIFIER;
}

describe("ClientRepository Integration Tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ClientModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should successfully add a client", async () => {
        const clientIdentifier = await _addClient();

        /**
         * The persistence layer is only accessed to make sure that persistence really worked.
         */
        const persistedClient = await ClientModel.findOne({
            where: { id: clientIdentifier.value },
        });

        expect(persistedClient).not.toBeNull();
    });

    it("should successfully find a client", async () => {
        const clientRepository = new ClientRepository();

        const clientIdentifier = await _addClient();

        const foundClient = await clientRepository.find(clientIdentifier);

        expect(foundClient).not.toBeNull();

        expect(foundClient.id.value).toBe(clientIdentifier.value);
    });
});
