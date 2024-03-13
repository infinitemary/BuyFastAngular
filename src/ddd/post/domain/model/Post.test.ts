import { describe, it, expect } from "vitest";
import { Post } from "./Post";

describe("Post class", () => {
  it("should correctly assign and expose the id property", () => {
    const postId = 123;
    const post = new Post(postId);

    expect(post.id).toBe(postId);
  });
});


