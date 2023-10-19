import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { ListCarImagesUseCase } from './ListCarImagesUseCase';

class ListCarImagesController {
  async handle (request: Request, response: Response): Promise<Response> {
    const listCarImagesUseCase = container.resolve(ListCarImagesUseCase);

    const images = await listCarImagesUseCase.execute();

    return response.status(200).json(images);
  }
}

export { ListCarImagesController };
