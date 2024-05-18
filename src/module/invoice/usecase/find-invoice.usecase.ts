import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import {
    FindInvoiceUsecaseInputDTO,
    FindInvoiceUsecaseOutputDTO,
} from "./find-invoice.usecase.dto";

export class FindInvoiceUsecase
    implements
        UsecaseInterface<
            FindInvoiceUsecaseInputDTO,
            FindInvoiceUsecaseOutputDTO
        >
{
    private _repository: InvoiceGateway;

    constructor(repository: InvoiceGateway) {
        this._repository = repository;
    }

    async execute(
        input: FindInvoiceUsecaseInputDTO,
    ): Promise<FindInvoiceUsecaseOutputDTO> {
        const invoice = await this._repository.find(input);

        if (!invoice) {
            return null;
        }

        const output: FindInvoiceUsecaseOutputDTO = {
            id: invoice.id,
            name: invoice.name,
            address: invoice.address,
            items: invoice.items,
            document: invoice.document,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        };

        return output;
    }
}
