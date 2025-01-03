import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, email, password, driver_license, username } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license,
      username
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
