import { type Repository } from 'typeorm';

import { connection } from '../../../../../shared/infra/typeorm';
import { type ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { type IUsersRepository } from '../../../repositories/IUsersRepository';
import { User } from '../entities/Users';

class UsersRepository implements IUsersRepository {
  private readonly repository: Repository<User>;

  constructor () {
    this.repository = connection.getRepository(User);
  }

  async create ({ name, email, password, username, driver_license, avatar, id }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      id,
      username,
      avatar
    });

    await this.repository.save(user);
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }

  async findById (id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }
}

export { UsersRepository };
