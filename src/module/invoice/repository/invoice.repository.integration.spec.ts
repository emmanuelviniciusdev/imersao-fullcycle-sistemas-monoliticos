import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceRepository } from "./invoice.repository";
import {
    INVOICE_ENTITY_1,
    INVOICE_ENTITY_2,
    INVOICE_IDENTIFIER_1,
    INVOICE_IDENTIFIER_2,
} from "../mock/invoice.entity.mock";

async function _addInvoices() {
    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.save(INVOICE_ENTITY_1);
    await invoiceRepository.save(INVOICE_ENTITY_2);
}

describe("InvoiceRepository Integration Tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel, InvoiceItemModel]);

        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should successfully find an invoice", async () => {
        await _addInvoices();

        const invoiceRepository = new InvoiceRepository();

        const invoice1 = await invoiceRepository.find({
            idInvoice: INVOICE_IDENTIFIER_1,
        });

        expect(invoice1).not.toBeNull();
        expect(invoice1.id.value).toBe(INVOICE_IDENTIFIER_1.value);
        expect(invoice1.items).toHaveLength(2);

        const invoice2 = await invoiceRepository.find({
            idInvoice: INVOICE_IDENTIFIER_2,
        });

        expect(invoice2).not.toBeNull();
        expect(invoice2.id.value).toBe(INVOICE_IDENTIFIER_2.value);
        expect(invoice2.items).toHaveLength(1);
    });

    it("should successfully add an invoice", async () => {
        await _addInvoices();

        for (const idInvoice of [INVOICE_IDENTIFIER_1, INVOICE_IDENTIFIER_2]) {
            /**
             * The persistence layer is only accessed to make sure that persistence really worked.
             */
            const persistedInvoice = await InvoiceModel.findOne({
                where: { id: idInvoice.value },
            });

            expect(persistedInvoice).not.toBeNull();
        }
    });
});
