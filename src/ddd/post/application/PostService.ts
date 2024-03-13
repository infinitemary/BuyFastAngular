import { PostRepository } from "../domain/repository/PostRepository";

export class PostService {
  constructor(private postRepository: PostRepository) {}

  async execute(page: number) {
    return await this.postRepository.findAll(page);
  }
}
