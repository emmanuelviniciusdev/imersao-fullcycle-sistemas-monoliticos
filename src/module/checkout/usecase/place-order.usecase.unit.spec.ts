import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { PaymentFacade } from "../../payment/facade/payment.facade";
import { ProcessPaymentUsecase } from "../../payment/usecase/process-payment.usecase";
import { PlaceOrderUsecase } from "./place-order.usecase";
import { PlaceOrderUsecaseInputDTO } from "./place-order.usecase.dto";

const CLIENT_ADMIN_1 = {
    id: new Identifier(),
    name: "Hayley",
    address: "1234 Main Street, Apt 567, Nashville, TN 37201",
    email: "hayley@icloud.com",
    document: "111111-1",
    street: "Main Street",
    number: "1234",
    complement: "Apt 567",
    city: "Nashville",
    state: "TN",
    zipCode: "37201",
    updatedAt: new Date("2001-01-01"),
    createdAt: new Date("2001-01-01"),
};

async function generatePaymentFacade() {
    const MockTransactionRepository = {
        save: jest.fn((transaction) => transaction),
    };

    const processPaymentUsecase = new ProcessPaymentUsecase(
        MockTransactionRepository,
    );

    return new PaymentFacade(processPaymentUsecase);
}

async function generateDefaultPlaceOrderUsecase() {
    const MockCheckoutRepository = {
        findOrder: jest.fn(),
        addOrder: jest.fn(),
    };

    const MockClientAdminFacade = {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(CLIENT_ADMIN_1),
    };

    const MockProductAdminFacade = {
        addProduct: jest.fn(),
        checkProductStock: jest
            .fn()
            .mockReturnValue({ productId: new Identifier(), stock: 100 }),
    };

    const MockStoreCatalogFacade = {
        find: jest.fn().mockReturnValue({
            id: new Identifier(),
            name: "iPod Touch 16GB",
            description:
                "The iPod Touch 16GB is a portable media player designed and sold by Apple Inc. It combines the functionality of an iPhone (minus the cellular connectivity) with the sleek design and capabilities of an iPod",
            salesPrice: 59.99,
            updatedAt: new Date("2001-01-01"),
            createdAt: new Date("2001-01-01"),
        }),
        findAll: jest.fn(),
    };

    const MockInvoiceFacade = {
        save: jest.fn().mockReturnValue({ id: new Identifier() }),
        find: jest.fn(),
    };

    const paymentFacade = await generatePaymentFacade();

    const placeOrderUsecase = new PlaceOrderUsecase(MockCheckoutRepository);

    placeOrderUsecase["_clientAdminFacade"] = MockClientAdminFacade;
    placeOrderUsecase["_productAdminFacade"] = MockProductAdminFacade;
    placeOrderUsecase["_storeCatalogFacade"] = MockStoreCatalogFacade;
    placeOrderUsecase["_paymentFacade"] = paymentFacade;
    placeOrderUsecase["_invoiceFacade"] = MockInvoiceFacade;

    return placeOrderUsecase;
}

describe("PlaceOrderUsecase Unit Tests", () => {
    describe("Order placing", () => {
        it("should not place an order if payment is not processed", async () => {
            /**
             * The payment will be declined if the total amount is less than $100.
             * Each mocked product is $59.99.
             */

            const placeOrderUsecase = await generateDefaultPlaceOrderUsecase();

            const input: PlaceOrderUsecaseInputDTO = {
                clientId: CLIENT_ADMIN_1.id,
                products: [{ productId: new Identifier() }],
            };

            const output = await placeOrderUsecase.execute(input);

            expect(output.invoiceId).toBeNull();
            expect(output.status).toBe("declined");
        });

        it("should successfully place an order if payment is processed", async () => {
            /**
             * The payment will be declined if the total amount is less than $100.
             * Each mocked product is $59.99.
             */

            const placeOrderUsecase = await generateDefaultPlaceOrderUsecase();

            const input: PlaceOrderUsecaseInputDTO = {
                clientId: CLIENT_ADMIN_1.id,
                products: [
                    { productId: new Identifier() },
                    { productId: new Identifier() },
                    { productId: new Identifier() },
                ],
            };

            const output = await placeOrderUsecase.execute(input);

            expect(output.invoiceId).not.toBeNull();
            expect(output.status).toBe("approved");
        });
    });

    describe("Basic validations", () => {
        it("should throw an error if products are not found", async () => {
            const MockCheckoutRepository = {
                findOrder: jest.fn(),
                addOrder: jest.fn(),
            };

            const MockClientAdminFacade = {
                add: jest.fn(),
                find: jest.fn().mockReturnValue(true),
            };

            const MockProductAdminFacade = {
                addProduct: jest.fn(),
                checkProductStock: jest
                    .fn()
                    .mockReturnValue({ productId: new Identifier(), stock: 1 }),
            };

            const MockStoreCatalogFacade = {
                find: jest.fn(),
                findAll: jest.fn(),
            };

            const placeOrderUsecase = new PlaceOrderUsecase(
                MockCheckoutRepository,
            );

            placeOrderUsecase["_clientAdminFacade"] = MockClientAdminFacade;
            placeOrderUsecase["_productAdminFacade"] = MockProductAdminFacade;
            placeOrderUsecase["_storeCatalogFacade"] = MockStoreCatalogFacade;

            const input: PlaceOrderUsecaseInputDTO = {
                clientId: new Identifier(
                    "ad84a240-5df9-48a7-8c23-a2a8b7cc3532",
                ),
                products: [{ productId: new Identifier() }],
            };

            expect(placeOrderUsecase.execute(input)).rejects.toThrowError(
                `Product with ID ${input.products[0].productId.value} not found`,
            );
        });

        it("should throw an error if products are out of stock", async () => {
            const MockCheckoutRepository = {
                findOrder: jest.fn(),
                addOrder: jest.fn(),
            };

            const MockClientAdminFacade = {
                add: jest.fn(),
                find: jest.fn().mockReturnValue(true),
            };

            const productIdAvailable = new Identifier(
                "14e76bf7-1ceb-4691-84d3-0817a331011e",
            );
            const productIdUnavailable = new Identifier(
                "0b01c098-2486-4c3a-8fb9-91602de3f43f",
            );

            const MockProductAdminFacade = {
                addProduct: jest.fn(),
                checkProductStock: jest.fn(({ productId }) =>
                    Promise.resolve(
                        productId === productIdUnavailable
                            ? { productId, stock: 0 }
                            : { productId, stock: 1 },
                    ),
                ),
            };

            const placeOrderUsecase = new PlaceOrderUsecase(
                MockCheckoutRepository,
            );

            placeOrderUsecase["_clientAdminFacade"] = MockClientAdminFacade;
            placeOrderUsecase["_productAdminFacade"] = MockProductAdminFacade;

            const input: PlaceOrderUsecaseInputDTO = {
                clientId: new Identifier(
                    "ad84a240-5df9-48a7-8c23-a2a8b7cc3532",
                ),
                products: [
                    { productId: productIdUnavailable },
                    { productId: productIdAvailable },
                ],
            };

            expect(placeOrderUsecase.execute(input)).rejects.toThrowError(
                "There are products out of stock",
            );
        });

        it("should throw an error when no products are selected", async () => {
            const MockCheckoutRepository = {
                findOrder: jest.fn(),
                addOrder: jest.fn(),
            };

            const MockClientAdminFacade = {
                add: jest.fn(),
                find: jest.fn().mockReturnValue(true),
            };

            const placeOrderUsecase = new PlaceOrderUsecase(
                MockCheckoutRepository,
            );

            placeOrderUsecase["_clientAdminFacade"] = MockClientAdminFacade;

            const input: PlaceOrderUsecaseInputDTO = {
                clientId: new Identifier(
                    "ad84a240-5df9-48a7-8c23-a2a8b7cc3532",
                ),
                products: [],
            };

            expect(placeOrderUsecase.execute(input)).rejects.toThrowError(
                `No products selected`,
            );
        });

        it("should throw an error when client is not found", async () => {
            const MockCheckoutRepository = {
                findOrder: jest.fn(),
                addOrder: jest.fn(),
            };

            const MockClientAdminFacade = {
                add: jest.fn(),
                find: jest.fn().mockReturnValue(null),
            };

            const placeOrderUsecase = new PlaceOrderUsecase(
                MockCheckoutRepository,
            );

            placeOrderUsecase["_clientAdminFacade"] = MockClientAdminFacade;

            const input: PlaceOrderUsecaseInputDTO = {
                clientId: new Identifier(
                    "ad84a240-5df9-48a7-8c23-a2a8b7cc3532",
                ),
                products: [],
            };

            expect(placeOrderUsecase.execute(input)).rejects.toThrowError(
                `Client with ID ${input.clientId.value} not found`,
            );
        });
    });
});
