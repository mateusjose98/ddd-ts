import Customer from "../customer/customer";
import { Order } from "./order";
import OrderItem from "./order_item";
import OrderService from "./order.service";

describe("order service unit tests", () => {
  it("should place an order", () => {
    const item = new OrderItem("1", "Product 1", 100, "2", 1);
    const item2 = new OrderItem("2", "Product 2", 200, "2", 1);

    const items = [item, item2];

    const customer = new Customer("1", "Customer 1");

    const order = OrderService.placeOrder(customer, items);

    expect(customer.rewardPoints).toBe(150);
    expect(order.total()).toBe(300);
  });

  it("should get total of all orders", () => {
    const item = new OrderItem("1", "Product 1", 100, "1", 1);
    const item2 = new OrderItem("2", "Product 2", 200, "1", 1);

    const items = [item, item2];

    const costumer = new Customer("1", "Customer 1");

    const order1 = new Order("1", costumer.id, items);

    const item3 = new OrderItem("3", "Product 3", 300, "2", 1);

    const order2 = new Order("2", costumer.id, [item3]);

    const total = OrderService.totalAmount([order1, order2]);

    expect(total).toBe(600);
  });
});
