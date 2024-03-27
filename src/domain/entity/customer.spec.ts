import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("1", "")).toThrow("Name is required");
  });

  it("should throw error when change name to empty", () => {
    const customer = new Customer("1", "John Doe");
    expect(() => customer.changeName("")).toThrow("Name is required");
  });
  it("it should change the name of the customer", () => {
    const customer = new Customer("1", "John Doe");
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "John Doe");
    customer.address = new Address("123", "Main St", "Springfield", "12345");
    customer.activate();
    expect(customer._active).toBe(true);
  });
  it("should not activate customer without address", () => {
    const customer = new Customer("1", "John Doe");
    expect(() => customer.activate()).toThrow(
      "Address is mandatory to activate customer"
    );
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "John Doe");
    customer.deactivate();
    expect(customer._active).toBe(false);
  });
});
