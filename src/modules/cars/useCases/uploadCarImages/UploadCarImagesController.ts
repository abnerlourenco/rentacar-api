import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

class UploadCarImagesController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const images = request.files as Express.Multer.File[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    if (!images) {
      throw new AppError('No file were found');
    }

    const images_name = images.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name
    });

    return response.status(204).send();
  }
}

export { UploadCarImagesController };
