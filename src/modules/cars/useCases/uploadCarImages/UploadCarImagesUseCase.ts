import { inject, injectable } from 'tsyringe';

import { type CarsImagesRepository } from '../../infra/typeorm/repositories/CarsImagesRepository';

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor (
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: CarsImagesRepository
  ) {}

  async execute ({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
