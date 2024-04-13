import { v4 as uuid } from "uuid";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
      // outro tipo que siga o contrato de ProductInterface
      // return new ProductB(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
