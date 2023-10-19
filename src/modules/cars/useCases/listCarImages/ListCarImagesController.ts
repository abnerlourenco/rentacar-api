import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { ListCarImagesUseCase } from './ListCarImagesUseCase';

class ListCarImagesController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCarImagesUseCase = container.resolve(ListCarImagesUseCase);

    const images = await listCarImagesUseCase.execute(id);

    return response.status(200).json(images);
  }
}

export { ListCarImagesController };
