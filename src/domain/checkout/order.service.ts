import Customer from "../customer/entity/customer";
import { Order } from "./order";
import OrderItem from "./order_item";
import { v4 as uuid } from "uuid";
export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]) {
    if (items.length === 0)
      throw new Error("Order must have at least one item");

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
  static totalAmount(orders: Order[]): number {
    return orders.reduce((acc, order) => {
      return acc + order.total();
    }, 0);
  }
}
