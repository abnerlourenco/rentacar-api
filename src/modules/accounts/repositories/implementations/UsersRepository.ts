import { type Repository } from 'typeorm';

import { connection } from '../../../../database';
import { type ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/Users';
import { type IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private readonly repository: Repository<User>;

  constructor () {
    this.repository = connection.getRepository(User);
  }

  async create ({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password
    });

    await this.repository.save(user);
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });

    return user;
  }
}

export { UsersRepository };
