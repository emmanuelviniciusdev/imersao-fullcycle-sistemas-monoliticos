import { INVOICE_ENTITY_1 } from "./invoice.entity.mock";

export const InvoiceRepositoryMock = () => ({
    save: jest.fn().mockReturnValue(INVOICE_ENTITY_1),
    find: jest.fn().mockReturnValue(INVOICE_ENTITY_1),
});
