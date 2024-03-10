import { Product } from "../domain/model/Product";
import { ProductRepository } from "../domain/repository/ProductRepository";

export class FakeStoreProductRepository implements ProductRepository {
    async findAll(page: number): Promise<Product[]> {
      const response = await fetch(`https://fakestoreapi.com/products?limit=5&page=${page}`);
      const data = await response.json();
      return data.map((item: any) => new Product(item.id, item.title, item.price, item.description, item.category, item.image));
    }
  }