import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalsUseCase } from './CreateRentalsUseCase';

class CreateRentalsController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const { car_id, expected_return_date } = request.body;

    const createRentalsUseCase = container.resolve(CreateRentalsUseCase);

    const rental = await createRentalsUseCase.execute({
      user_id,
      car_id,
      expected_return_date
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalsController };
