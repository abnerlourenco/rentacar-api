import { type ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/Users';
import { type IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];
  async create ({ driver_license, email, name, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password
    });

    this.users.push(user);
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async findById (id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}

export { UsersRepositoryInMemory };
