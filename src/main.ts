import Address from "./domain/customer/address";
import Customer from "./domain/customer/customer";
import { Order } from "./domain/checkout/order";
import OrderItem from "./domain/checkout/order_item";

let customer = new Customer("123", "John Doe");
const address = new Address("123", 222, "Springfield", "USA");
customer._address = address;
customer.activate();

let item1 = new OrderItem("123", "item1", 100, "2", 1);
let item2 = new OrderItem("124", "item2", 200, "2", 1);
let items = [item1, item2];

// Create order
let order = new Order("123", "123", items);
