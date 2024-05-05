import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from './CreateRentalsUseCase';

class CreateRentalController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const { car_id, expected_return_date } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      user_id,
      car_id,
      expected_return_date
    });

    return response.status(201).json(rental);
  }
}

export { CreateRentalController };
