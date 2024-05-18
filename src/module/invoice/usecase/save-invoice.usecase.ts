import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import { InvoiceEntity } from "../domain/entity/invoice.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import {
    SaveInvoiceUsecaseInputDTO,
    SaveInvoiceUsecaseOutputDTO,
} from "./save-invoice.usecase.dto";

export class SaveInvoiceUsecase
    implements
        UsecaseInterface<
            SaveInvoiceUsecaseInputDTO,
            SaveInvoiceUsecaseOutputDTO
        >
{
    private _repository: InvoiceGateway;

    constructor(repository: InvoiceGateway) {
        this._repository = repository;
    }

    async execute(
        input: SaveInvoiceUsecaseInputDTO,
    ): Promise<SaveInvoiceUsecaseOutputDTO> {
        const invoiceEntity = new InvoiceEntity({
            id: input.id,
            name: input.name,
            document: input.document,
            address: input.address,
            items: input.items,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });

        const invoice = await this._repository.save(invoiceEntity);

        const output: SaveInvoiceUsecaseOutputDTO = {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: invoice.address,
            items: invoice.items,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        };

        return output;
    }
}
