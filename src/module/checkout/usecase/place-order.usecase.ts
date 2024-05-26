import { Address } from "../../@shared/domain/value-object/address.value-object";
import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { UsecaseInterface } from "../../@shared/usecase/usecase.interface";
import { ClientAdminFacadeFactory } from "../../client-admin/facade/client-admin.facade.factory";
import { ClientAdminFacadeInterface } from "../../client-admin/facade/client-admin.facade.interface";
import { InvoiceFacadeFactory } from "../../invoice/facade/invoice.facade.factory";
import { InvoiceFacadeInterface } from "../../invoice/facade/invoice.facade.interface";
import { PaymentFacadeFactory } from "../../payment/facade/payment.facade.factory";
import { PaymentFacadeInterface } from "../../payment/facade/payment.facade.interface";
import { ProductAdminFacadeFactory } from "../../product-admin/facade/product-admin.facade.factory";
import { ProductAdminFacadeInterface } from "../../product-admin/facade/product-admin.facade.interface";
import { StoreCatalogFacadeFactory } from "../../store-catalog/facade/store-catalog.facade.factory";
import { StoreCatalogFacadeInterface } from "../../store-catalog/facade/store-catalog.facade.interface";
import { ClientEntity } from "../domain/entity/client.entity";
import { OrderEntity } from "../domain/entity/order.entity";
import { ProductEntity } from "../domain/entity/product.entity";
import { ProductEntityInterface } from "../domain/entity/product.entity.interface";
import { CheckoutGateway } from "../gateway/checkout.gateway";
import {
    PlaceOrderUsecaseInputDTO,
    PlaceOrderUsecaseOutputDTO,
    ProductReference,
} from "./place-order.usecase.dto";

export class PlaceOrderUsecase
    implements
        UsecaseInterface<PlaceOrderUsecaseInputDTO, PlaceOrderUsecaseOutputDTO>
{
    private _repository: CheckoutGateway;

    private _clientAdminFacade: ClientAdminFacadeInterface;
    private _productAdminFacade: ProductAdminFacadeInterface;
    private _storeCatalogFacade: StoreCatalogFacadeInterface;
    private _paymentFacade: PaymentFacadeInterface;
    private _invoiceFacade: InvoiceFacadeInterface;

    constructor(repository: CheckoutGateway) {
        this._repository = repository;

        this._clientAdminFacade = ClientAdminFacadeFactory.create();
        this._productAdminFacade = ProductAdminFacadeFactory.create();
        this._storeCatalogFacade = StoreCatalogFacadeFactory.create();
        this._paymentFacade = PaymentFacadeFactory.create();
        this._invoiceFacade = InvoiceFacadeFactory.create();
    }

    async execute(
        input: PlaceOrderUsecaseInputDTO,
    ): Promise<PlaceOrderUsecaseOutputDTO> {
        const clientAdmin = await this._clientAdminFacade.find({
            clientId: input.clientId,
        });

        if (!clientAdmin) {
            throw new Error(`Client with ID ${input.clientId.value} not found`);
        }

        await this.validateProducts(input.products);

        const products = await this.getAllProducts(input.products);

        const client = new ClientEntity({
            id: clientAdmin.id,
            name: clientAdmin.name,
            document: clientAdmin.document,
            email: clientAdmin.email,
            address: clientAdmin.address,
            street: clientAdmin.street,
            number: clientAdmin.number,
            complement: clientAdmin.complement,
            city: clientAdmin.city,
            state: clientAdmin.state,
            zipCode: clientAdmin.zipCode,
            createdAt: clientAdmin.createdAt,
            updatedAt: clientAdmin.updatedAt,
        });

        const order = new OrderEntity({ client, products });

        this._repository.addOrder(order);

        const payment = await this._paymentFacade.process({
            orderId: order.id,
            amount: order.total,
        });

        if (payment.status === "approved") {
            order.approve();
        }

        const address = new Address(
            client.street,
            client.number,
            client.city,
            client.state,
            client.complement,
            client.zipCode,
        );

        const invoiceId = new Identifier();

        const invoice =
            payment.status === "approved"
                ? await this._invoiceFacade.save({
                      id: invoiceId,
                      name: client.name,
                      document: client.document,
                      address: address,
                      items: products.map((p) => ({
                          id: p.id,
                          name: p.name,
                          price: p.salesPrice,
                          idInvoice: invoiceId,
                          createdAt: p.createdAt,
                          updatedAt: p.updatedAt,
                      })),
                  })
                : null;

        return {
            orderId: order.id,
            invoiceId: invoice?.id || null,
            status: payment.status,
            total: order.total,
            products,
        };
    }

    private async getAllProducts(
        products: ProductReference[],
    ): Promise<ProductEntityInterface[]> {
        const getProductPromises = products.map((p) =>
            this.getProduct(p.productId),
        );

        const foundProducts = await Promise.all(getProductPromises);

        return foundProducts;
    }

    private async getProduct(
        productId: Identifier,
    ): Promise<ProductEntityInterface> {
        const product = await this._storeCatalogFacade.find(productId);

        if (!product) {
            throw new Error(`Product with ID ${productId.value} not found`);
        }

        return new ProductEntity({
            id: product.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        });
    }

    private async checkProductsStock(products: ProductReference[]) {
        const verificationProductStockResultsPromises = products.map((p) =>
            this._productAdminFacade.checkProductStock({
                productId: p.productId,
            }),
        );

        const verificationProductStockResults = await Promise.all(
            verificationProductStockResultsPromises,
        );

        const isThereAnyProductOutOfStock =
            verificationProductStockResults.some((result) => !result.stock);

        if (isThereAnyProductOutOfStock) {
            throw new Error("There are products out of stock");
        }
    }

    private async validateProducts(products: ProductReference[]) {
        if (products.length === 0) {
            throw new Error("No products selected");
        }

        await this.checkProductsStock(products);
    }
}
