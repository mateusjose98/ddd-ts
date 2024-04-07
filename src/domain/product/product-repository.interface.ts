import Product from "./product";
import RepositoryInterface from "../@shared/repository/repository-interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
