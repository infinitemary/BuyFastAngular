
import { describe, it, expect, vi } from "vitest";
import { PostService } from "./PostService";

// Mock PostRepository implementation
const mockPostRepository = {
  findAll: vi
    .fn()
    .mockImplementation((page: number) =>
      Promise.resolve([{ id: 1 }, { id: 2 }])
    ),
};

describe("PostService", () => {
  it("execute should call postRepository.findAll with the correct page number", async () => {
    // Create an instance of PostService with the mocked PostRepository
    const postService = new PostService(mockPostRepository);

    // Call the execute method
    const page = 1;
    const posts = await postService.execute(page);

    // Verify that postRepository.findAll was called once with the correct page number
    expect(mockPostRepository.findAll).toHaveBeenCalledWith(page);
    expect(mockPostRepository.findAll).toHaveBeenCalledTimes(1);

    // Verify that the result is as expected
    expect(posts).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

