import Address from "./address";

export default class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean = false;
  _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get address() {
    return this._address;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  isActive() {
    return this._active;
  }

  changeName(newName: string) {
    this._name = newName;
    this.validate();
  }
  activate() {
    if (!this._address) {
      throw new Error("Address is mandatory to activate customer");
    }
    this._active = true;
  }
  deactivate() {
    this._active = false;
  }

  set address(address: Address) {
    this._address = address;
    this.validate();
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (!this._name) {
      throw new Error("Name is required");
    }
    this._address?.validate();
  }
}
