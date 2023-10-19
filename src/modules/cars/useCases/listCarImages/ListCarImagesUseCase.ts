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

  async execute (car_id: string): Promise<CarImage[]> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car not exists');
    }

    const images = await this.carsImagesRepository.list(car_id);

    if (!images) {
      throw new AppError('No images found');
    }

    return images;
  }
}

export { ListCarImagesUseCase };
