import { AppError } from '../../../../shared/errors/AppError';
import { type ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('Autenticar usuário', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to create a token user authentication', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0011154',
      email: 'user@example.com',
      password: '1234',
      name: 'User test'
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an not exists user', async () => {
    void expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@example.com',
        password: '1234'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user with invalid password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '0011154',
      email: 'user@example.com',
      password: '1234',
      name: 'User test'
    };
    await createUserUseCase.execute(user);

    void expect(async () => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: '4321'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
