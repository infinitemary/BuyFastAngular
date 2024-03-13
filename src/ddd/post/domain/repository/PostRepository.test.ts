
import { Post } from "../model/Post";
import { PostRepository } from "./PostRepository";
import { describe, it, expect } from 'vitest';
export class InMemoryPostRepository implements PostRepository {
  private posts: Post[] = [new Post(1), new Post(2)];

  async findAll(page: number): Promise<Post[]> {
    // Simple example: return all posts ignoring pagination
    return Promise.resolve(this.posts);
  }
}


describe('InMemoryPostRepository', () => {
  it('findAll should return all posts', async () => {
    const postRepository = new InMemoryPostRepository();
    const posts = await postRepository.findAll(1); 
    expect(posts.length).toBe(2);
    expect(posts[0].id).toBeDefined();
    expect(posts[1].id).toBeDefined();
  });
});

