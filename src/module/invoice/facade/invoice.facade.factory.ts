import { InvoiceRepository } from "../repository/invoice.repository";
import { FindInvoiceUsecase } from "../usecase/find-invoice.usecase";
import { SaveInvoiceUsecase } from "../usecase/save-invoice.usecase";
import { InvoiceFacade } from "./invoice.facade";

export class InvoiceFacadeFactory {
    static create() {
        const invoiceRepository = new InvoiceRepository();

        const findInvoiceUsecase = new FindInvoiceUsecase(invoiceRepository);
        const saveInvoiceUsecase = new SaveInvoiceUsecase(invoiceRepository);

        return new InvoiceFacade(findInvoiceUsecase, saveInvoiceUsecase);
    }
}
