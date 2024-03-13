import { describe, it, expect } from "vitest";
import { User } from "./User";

describe("User class", () => {
  it("should correctly assign and expose the id property", () => {
    const userId = 123;
    const user = new User(userId);

    expect(user.id).toBe(userId);
  });
});
