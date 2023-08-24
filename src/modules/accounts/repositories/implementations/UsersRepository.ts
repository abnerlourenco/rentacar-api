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

  async create ({ name, username, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      email,
      driver_license,
      password
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
