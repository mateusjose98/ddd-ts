import { Order } from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "1", [])).toThrow("Id is required");
  });
  it("should calculate total amount", () => {
    const item = new OrderItem("1", "Chocolate", 4300.0);
    const order = new Order("1", "1", [item]);
    expect(order.total()).toBe(4300.0);
  });
  it("should throw error for customerid empty", () => {
    expect(() => new Order("1", "", [])).toThrow("CustomerId is required");
  });
  it("should throw error for items empty", () => {
    expect(() => new Order("1", "bbb", [])).toThrow("Items are required");
  });
});
