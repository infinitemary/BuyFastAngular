import { describe, it, expect, vi } from "vitest";
import { UserService } from "./UserService";

// Mock UserRepository implementation
const mockUserRepository = {
  findAll: vi
    .fn()
    .mockImplementation((page: number) =>
      Promise.resolve([{ id: 1 }, { id: 2 }])
    ),
};

describe("UserService", () => {
  it("execute should call userRepository.findAll with the correct page number", async () => {
    // Create an instance of UserService with the mocked UserRepository
    const userService = new UserService(mockUserRepository);

    // Call the execute method
    const page = 1;
    const users = await userService.execute(page);

    // Verify that userRepository.findAll was called once with the correct page number
    expect(mockUserRepository.findAll).toHaveBeenCalledWith(page);
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);

    // Verify that the result is as expected
    expect(users).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
