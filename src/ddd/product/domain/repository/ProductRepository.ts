import { Product } from "../model/Product";

export interface ProductRepository {
  findAll(page: number): Promise<Product[]>;
}
