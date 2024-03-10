import { Product } from "../domain/model/Product";
import { ProductRepository } from "../domain/repository/ProductRepository";

export class LocalStoreProductRepository implements ProductRepository {
  async findAll(page: number): Promise<Product[]> {
    return [
      {
        id: 1,
        title: "",
        price: "",
        description: "",
        category: "",
        image: "img/default/loading-post.png",
      },
      {
        id: 2,
        title: "",
        price: "",
        description: "",
        category: "",
        image: "img/default/loading-post.png",
      },
      {
        id: 3,
        title: "",
        price: "",
        description: "",
        category: "",
        image: "img/default/loading-post.png",
      },
    ].map(
      (item: any) =>
        new Product(
          item.id,
          item.title,
          item.price,
          item.description,
          item.category,
          item.image
        )
    );
  }
}
