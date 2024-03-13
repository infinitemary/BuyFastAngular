import { describe, it, expect, beforeEach, vi } from "vitest";

import { Post } from "../domain/model/Post";
import { FakePostRepository } from "./FakePostRepository";

// Mock the global fetch function
global.fetch = vi.fn();

describe("FakePostRepository", () => {
  beforeEach(() => {
    // Reset the fetch mock before each test
    vi.resetAllMocks();
  });

  it("findAll should fetch data from the API and return Post instances", async () => {
    // Mocked response data
    const mockPosts = [{ id: 1 }, { id: 2 }];

    // Mock fetch to return a response with the mocked data
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockPosts),
    });

    const postRepository = new FakePostRepository();
    const page = 1;
    const posts = await postRepository.findAll(page);

    // Assert fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(`api?page=${page}`);

    // Assert the correct number of posts are returned
    expect(posts.length).toBe(mockPosts.length);

    // Assert instances of Post are returned
    posts.forEach((post, index) => {
      expect(post).toBeInstanceOf(Post);
      expect(post.id).toBe(mockPosts[index].id);
    });
  });

  // You can add more tests here to cover different scenarios,
  // such as handling fetch errors or empty responses.
});

