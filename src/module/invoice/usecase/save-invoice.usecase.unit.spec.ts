import {
    INVOICE_ENTITY_1,
    INVOICE_IDENTIFIER_1,
} from "../mock/invoice.entity.mock";
import { InvoiceRepositoryMock } from "../mock/invoice.repository.mock";
import { FindInvoiceUsecase } from "./find-invoice.usecase";
import { SaveInvoiceUsecase } from "./save-invoice.usecase";

describe("SaveInvoiceUsecase Unit Tests", () => {
    it("should successfully save an invoice", async () => {
        const repository = InvoiceRepositoryMock();

        const usecase = new SaveInvoiceUsecase(repository);

        const output = await usecase.execute(INVOICE_ENTITY_1);

        expect(output).not.toBeNull();
        expect(output.id.value).toBe(INVOICE_IDENTIFIER_1.value);

        expect(repository.save).toHaveBeenCalled();
    });
});
