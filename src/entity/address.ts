export default class Address {
  _street: string;
  _city: string;
  _state: string;
  _zip: string;

  constructor(street: string, city: string, state: string, zip: string) {
    this._street = street;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this.validate();
  }

  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zip() {
    return this._zip;
  }

  validate() {
    if (!this._street) {
      throw new Error("Street is required");
    }
    if (!this._city) {
      throw new Error("City is required");
    }
    if (!this._state) {
      throw new Error("State is required");
    }
    if (!this._zip) {
      throw new Error("Zip is required");
    }
  }
}