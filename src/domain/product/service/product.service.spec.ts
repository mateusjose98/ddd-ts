import Product from "../entity/product";
import ProductService from "./product.service";

describe("ProductService unit tests", () => {
  it("should change the prices of all products", () => {
    // Arrange
    const p1 = new Product("1", "Product 1", 100);
    const p2 = new Product("2", "Product 2", 200);
    const p3 = new Product("3", "Product 3", 300);
    const products = [p1, p2, p3];

    // Act
    ProductService.increasePrice(products, 100);
    // Assert
    expect(p1.price).toBe(200);
    expect(p2.price).toBe(400);
    expect(p3.price).toBe(600);
  });
});
