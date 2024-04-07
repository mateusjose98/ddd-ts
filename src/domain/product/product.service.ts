import Product from "./product";

export default class ProductService {
  static increasePrice(products: Product[], percentade: number): void {
    products.forEach((product) => {
      product.changePrice(product.price + (product.price * percentade) / 100);
    });
  }
}
