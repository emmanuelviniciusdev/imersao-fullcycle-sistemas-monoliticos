import { InvoiceEntity } from "../domain/entity/invoice.entity";
import { InvoiceEntityInterface } from "../domain/entity/invoice.entity.interface";
import { FindInvoiceInput, InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export class InvoiceRepository implements InvoiceGateway {
    async save(input: InvoiceEntityInterface): Promise<InvoiceEntityInterface> {
        await InvoiceModel.create({
            id: input.id.value,
            name: input.name,
            document: input.document,
            address: JSON.stringify(input.address || null),
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });

        for (const invoiceItemEntity of input.items) {
            await InvoiceItemModel.create({
                id: invoiceItemEntity.id.value,
                name: invoiceItemEntity.name,
                price: invoiceItemEntity.price,
                idInvoice: invoiceItemEntity.idInvoice.value,
                createdAt: invoiceItemEntity.createdAt,
                updatedAt: invoiceItemEntity.updatedAt,
            });
        }

        const persistedInvoice = await InvoiceModel.findOne({
            where: { id: input.id.value },
            include: [InvoiceItemModel],
        });

        const invoiceEntity = InvoiceEntity.createFromModel(persistedInvoice);

        return invoiceEntity;
    }

    async find(
        input: FindInvoiceInput,
    ): Promise<Partial<InvoiceEntityInterface>> {
        const persistedInvoice = await InvoiceModel.findOne({
            where: { id: input.idInvoice.value },
            include: [InvoiceItemModel],
        });

        if (!persistedInvoice) {
            return null;
        }

        const invoiceEntity = InvoiceEntity.createFromModel(persistedInvoice);

        return invoiceEntity;
    }
}
