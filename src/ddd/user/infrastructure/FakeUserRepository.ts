import { User } from "../domain/model/User";
import { UserRepository } from "../domain/repository/UserRepository";

export class FakeUserRepository implements UserRepository {
  async findAll(page: number): Promise<User[]> {
    const response = await fetch(`api?page=${page}`);
    const data = await response.json();
    return data.map((item: any) => new User(item.id));
  }
}
