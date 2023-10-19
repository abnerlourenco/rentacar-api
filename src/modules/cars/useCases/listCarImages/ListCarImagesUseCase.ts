import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { type CarImage } from '../../infra/typeorm/entities/CarImage';
import { ICarsImagesRepository } from '../../repositories/ICarsImagesRepository';
import { ICarsRepository } from '../../repositories/ICarsRepository';

@injectable()
class ListCarImagesUseCase {
  constructor (
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: ICarsImagesRepository,

    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute (): Promise<CarImage[]> {
    const images = await this.carsImagesRepository.list();

    if (!images) {
      throw new AppError('No images found');
    }

    return images;
  }
}

export { ListCarImagesUseCase };
