import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { ICarsImagesRepository } from '../../repositories/ICarsImagesRepository';

interface IRequest {
  car_id: string
  images_name: string[]
}

@injectable()
class UploadCarImagesUseCase {
  constructor (
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute ({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);

      await this.storageProvider.save(image, 'car-images');
    });
  }
}

export { UploadCarImagesUseCase };
