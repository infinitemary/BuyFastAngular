import { Post } from "../model/Post";

export interface PostRepository {
  findAll(page: number): Promise<Post[]>;
}
