import { Order } from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async save(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    console.log(entity);
    const currentOrder = {
      customer_id: entity.customerId,
    };
    try {
      await OrderModel.update(currentOrder, {
        where: { id: entity.id },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async find(id: string): Promise<Order> {
    const orderDb: OrderModel = await OrderModel.findByPk(id, {
      include: [{ model: OrderItemModel, as: "items" }],
    });

    if (!orderDb) {
      throw new Error("Order not found");
    }
    const orderItemDB: OrderItemModel[] = orderDb.items;
    const orderItems: OrderItem[] = orderItemDB.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      );
    });
    return new Order(orderDb.id, orderDb.customer_id, orderItems);
  }

  async findAll(): Promise<Order[]> {
    const ordersDb: OrderModel[] = await OrderModel.findAll({
      include: [{ model: OrderItemModel, as: "items" }],
    });

    const orders: Order[] = ordersDb.map((orderDb) => {
      const orderItemDB: OrderItemModel[] = orderDb.items;
      const orderItems: OrderItem[] = orderItemDB.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      });
      return new Order(orderDb.id, orderDb.customer_id, orderItems);
    });
    return orders;
  }
}
