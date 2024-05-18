import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import {
    FindInvoiceUsecaseInputDTO,
    FindInvoiceUsecaseOutputDTO,
} from "../usecase/find-invoice.usecase.dto";
import {
    SaveInvoiceUsecaseInputDTO,
    SaveInvoiceUsecaseOutputDTO,
} from "../usecase/save-invoice.usecase.dto";
import {
    FindInvoiceFacadeInputDTO,
    FindInvoiceFacadeOutputDTO,
    InvoiceFacadeInterface,
    SaveInvoiceFacadeInputDTO,
    SaveInvoiceFacadeOutputDTO,
} from "./invoice.facade.interface";

export class InvoiceFacade implements InvoiceFacadeInterface {
    constructor(
        private findInvoiceUsecase: UsecaseInterface<
            FindInvoiceUsecaseInputDTO,
            FindInvoiceUsecaseOutputDTO
        >,
        private saveInvoiceUsecase: UsecaseInterface<
            SaveInvoiceUsecaseInputDTO,
            SaveInvoiceUsecaseOutputDTO
        >,
    ) {}

    async find(
        input: FindInvoiceFacadeInputDTO,
    ): Promise<FindInvoiceFacadeOutputDTO> {
        const output = await this.findInvoiceUsecase.execute(input);
        return output;
    }

    async save(
        input: SaveInvoiceFacadeInputDTO,
    ): Promise<SaveInvoiceFacadeOutputDTO> {
        const output = await this.saveInvoiceUsecase.execute(input);
        return output;
    }
}
