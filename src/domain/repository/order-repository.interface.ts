import { Order } from "sequelize";
import RepositoryInterface from "./repository-interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Order> {}
