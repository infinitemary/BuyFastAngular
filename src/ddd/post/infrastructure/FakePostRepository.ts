import { Post } from "../domain/model/Post";
import { PostRepository } from "../domain/repository/PostRepository";

export class FakePostRepository implements PostRepository {
  async findAll(page: number): Promise<Post[]> {
    const response = await fetch(`api?page=${page}`);
    const data = await response.json();
    return data.map((item: any) => new Post(item.id));
  }
}
