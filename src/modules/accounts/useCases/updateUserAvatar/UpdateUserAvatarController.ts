import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    // receber arquivo
    const avatar_file = request.file?.filename;

    if (!avatar_file) {
      throw new AppError('file not found');
    }

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file
    });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
