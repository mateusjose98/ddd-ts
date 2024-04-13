import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/customer.model";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import ProductModel from "../product/repository/product.model";
import CustomerRepository from "../customer/customer.repository";
import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/entity/address";
import ProductRepository from "../product/repository/product.repository";
import Product from "../../domain/product/entity/product";
import OrderItem from "../../domain/checkout/order_item";
import { Order } from "../../domain/checkout/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      ProductModel,
      OrderItemModel,
      OrderModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    //wait 2 seconds before closing the connection
    await new Promise((resolve) => setTimeout(() => resolve(1), 2000));

    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;
    await customerRepository.save(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.save(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.save(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should find a order bu it id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;
    await customerRepository.save(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.save(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.save(order);

    const orderFound = await orderRepository.find(order.id);

    expect(orderFound.id).toBe(order.id);
    expect(orderFound.customerId).toBe(order.customerId);
    expect(orderFound.total()).toBe(order.total());
    expect(orderFound.items.length).toBe(1);
    expect(orderFound.items[0].id).toBe(orderItem.id);
    expect(orderFound.items[0].name).toBe(orderItem.name);
    expect(orderFound.items[0].price).toBe(orderItem.price);
    expect(orderFound.items[0].quantity).toBe(orderItem.quantity);
    expect(orderFound.items[0].productId).toBe(orderItem.productId);
  });

  it("should find all orders in db", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;
    await customerRepository.save(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.save(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.save(order);

    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(1);
    expect(orders[0].id).toBe(order.id);
    expect(orders[0].customerId).toBe(order.customerId);
    expect(orders[0].total()).toBe(order.total());
    expect(orders[0].items.length).toBe(1);
    expect(orders[0].items[0].id).toBe(orderItem.id);
    expect(orders[0].items[0].name).toBe(orderItem.name);
    expect(orders[0].items[0].price).toBe(orderItem.price);
    expect(orders[0].items[0].quantity).toBe(orderItem.quantity);
    expect(orders[0].items[0].productId).toBe(orderItem.productId);
  });

  it("should update a existing order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.address = address;
    await customerRepository.save(customer);

    const customer2 = new Customer("456", "Fulano novo");
    const address2 = new Address("Street 123", 1, "65400400", "City 1");
    customer2.address = address2;
    await customerRepository.save(customer2);

    const productRepository = new ProductRepository();
    const product = new Product("3", "Product 1", 10);
    await productRepository.save(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    const idOrder = "123";
    const order = new Order(idOrder, "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.save(order);

    const orderItem2 = new OrderItem("300", "Arroz", 10.4, "3", 2);

    await orderRepository.update(new Order(idOrder, "456", [orderItem2]));

    const fromDB = await orderRepository.find(idOrder);
    console.log(fromDB);
    expect(fromDB.customerId).toBe("456");
    expect(fromDB.items.length).toBe(1);
    expect(fromDB.items[0].id).toBe("300");
    expect(fromDB.items[0].name).toBe("Arroz");
  });
});
