import ProductInterface from "./product.interface";

export default class Product implements ProductInterface {
  _id: string;
  _name: string;
  _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }

    if (!this._name) {
      throw new Error("Name is required");
    }

    if (!this._price) {
      throw new Error("Price is required");
    }
  }

  changeName(newName: string) {
    this._name = newName;
    this.validate();
  }

  changePrice(newPrice: number) {
    this._price = newPrice;
    this.validate();
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get id() {
    return this._id;
  }
}
