
import { User } from "../model/User";
import { UserRepository } from "./UserRepository";
import { describe, it, expect } from 'vitest';
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [new User(1), new User(2)];

  async findAll(page: number): Promise<User[]> {
    // Simple example: return all users ignoring pagination
    return Promise.resolve(this.users);
  }
}


describe('InMemoryUserRepository', () => {
  it('findAll should return all users', async () => {
    const userRepository = new InMemoryUserRepository();
    const users = await userRepository.findAll(1); 
    expect(users.length).toBe(2);
    expect(users[0].id).toBeDefined();
    expect(users[1].id).toBeDefined();
  });
});