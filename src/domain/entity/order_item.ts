export default class OrderItem {
  _id: string;
  _name: string;
  _price: number;
  _quantity: number = 1;

  constructor(id: string, name: string, price: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
  }

  validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (!this._name) {
      throw new Error("Name is required");
    }
    if (!this._price || this._price <= 0) {
      throw new Error("Price is required");
    }
    if (!this._quantity || this._quantity <= 0) {
      throw new Error("Quantity is required");
    }
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}
