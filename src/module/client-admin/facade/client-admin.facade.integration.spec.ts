import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import { CLIENT_1, CLIENT_1_IDENTIFIER } from "../mock/client.entity.mock";
import { ClientAdminFacadeFactory } from "./client-admin.facade.factory";

describe("ClientAdminFacade Integration Tests", () => {
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
        const clientAdminFacade = ClientAdminFacadeFactory.create();

        await clientAdminFacade.add({ ...CLIENT_1 });

        const persistedClient = await ClientModel.findOne({
            where: { id: CLIENT_1_IDENTIFIER.value },
        });

        expect(persistedClient).not.toBeNull();

        expect(persistedClient.id).toBe(CLIENT_1_IDENTIFIER.value);
    });

    it("should successfully find a client", async () => {
        await ClientModel.create({
            ...CLIENT_1,
            id: CLIENT_1_IDENTIFIER.value,
        });

        const clientAdminFacade = ClientAdminFacadeFactory.create();

        const foundClient = await clientAdminFacade.find({
            clientId: CLIENT_1_IDENTIFIER,
        });

        expect(foundClient).not.toBeNull();

        expect(foundClient.id.value).toBe(CLIENT_1_IDENTIFIER.value);
    });
});
