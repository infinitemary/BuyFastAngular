import { ProductRepository } from "../domain/repository/ProductRepository";

export class FetchProductsService {
  constructor(private productRepository: ProductRepository) {}

  async execute(page: number) {
    return await this.productRepository.findAll(page);
  }
}
