import { describe, it, expect, beforeEach, vi } from "vitest";

import { User } from "../domain/model/User";
import { FakeUserRepository } from "./FakeUserRepository";

// Mock the global fetch function
global.fetch = vi.fn();

describe("FakeUserRepository", () => {
  beforeEach(() => {
    // Reset the fetch mock before each test
    vi.resetAllMocks();
  });

  it("findAll should fetch data from the API and return User instances", async () => {
    // Mocked response data
    const mockUsers = [{ id: 1 }, { id: 2 }];

    // Mock fetch to return a response with the mocked data
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockUsers),
    });

    const userRepository = new FakeUserRepository();
    const page = 1;
    const users = await userRepository.findAll(page);

    // Assert fetch was called correctly
    expect(fetch).toHaveBeenCalledWith(`api?page=${page}`);

    // Assert the correct number of users are returned
    expect(users.length).toBe(mockUsers.length);

    // Assert instances of User are returned
    users.forEach((user, index) => {
      expect(user).toBeInstanceOf(User);
      expect(user.id).toBe(mockUsers[index].id);
    });
  });

  // You can add more tests here to cover different scenarios,
  // such as handling fetch errors or empty responses.
});
