import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationsController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);

    const all = await listSpecificationsUseCase.execute();

    return response.status(200).json(all);
  }
}

export { ListSpecificationsController };
