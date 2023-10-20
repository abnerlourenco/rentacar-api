import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCarImageUseCase } from './DeleteCarImageUseCase';

class DeleteCarImageController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCarImageUseCase = container.resolve(DeleteCarImageUseCase);

    await deleteCarImageUseCase.execute(id);

    return response.status(200).send();
  }
}

export { DeleteCarImageController };
