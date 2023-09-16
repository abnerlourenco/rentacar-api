import { type ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { type User } from '../infra/typeorm/entities/Users';

interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<void>
  findByEmail: (email: string) => Promise<User | null>
  findById: (id: string) => Promise<User | null>
}

export type { IUsersRepository };
