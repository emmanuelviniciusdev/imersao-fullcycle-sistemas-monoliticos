import { Identifier } from "../../@shared/domain/value-object/identifier.value-object";
import { OrderEntityInterface } from "../domain/entity/order.entity.interface";

export interface CheckoutGateway {
    addOrder(order: OrderEntityInterface): OrderEntityInterface;
    findOrder(orderId: Identifier): Partial<OrderEntityInterface>;
}
