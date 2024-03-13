import { UserRepository } from "../domain/repository/UserRepository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async execute(page: number) {
    return await this.userRepository.findAll(page);
  }
}
