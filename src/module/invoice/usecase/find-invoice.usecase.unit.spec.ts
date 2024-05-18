import { INVOICE_IDENTIFIER_1 } from "../mock/invoice.entity.mock";
import { InvoiceRepositoryMock } from "../mock/invoice.repository.mock";
import { FindInvoiceUsecase } from "./find-invoice.usecase";

describe("FindInvoiceUsecase Unit Tests", () => {
    it("should successfully find an invoice", async () => {
        const repository = InvoiceRepositoryMock();

        const usecase = new FindInvoiceUsecase(repository);

        const output = await usecase.execute({
            idInvoice: INVOICE_IDENTIFIER_1,
        });

        expect(output).not.toBeNull();
        expect(output.id.value).toBe(INVOICE_IDENTIFIER_1.value);

        expect(repository.find).toHaveBeenCalled();
    });
});
