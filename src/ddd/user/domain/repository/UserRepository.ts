import { User } from "../model/User";

export interface UserRepository {
  findAll(page: number): Promise<User[]>;
}
