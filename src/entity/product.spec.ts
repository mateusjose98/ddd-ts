import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error id is empty", () => {
    expect(() => new Product("", "Product 1", 100)).toThrow("Id is required");
  });

  it("should throw error name is empty", () => {
    expect(() => new Product("1", "", 100)).toThrow("Name is required");
  });

  it("should throw error price is empty", () => {
    expect(() => new Product("1", "Product 1", 0)).toThrow("Price is required");
  });

  it("should change the name of the product", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product._name).toBe("Product 2");
  });

  it("should change the price of the product", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(200);
    expect(product._price).toBe(200);
  });
});
