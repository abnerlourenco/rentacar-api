import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { ICarsImagesRepository } from '../../repositories/ICarsImagesRepository';

@injectable()
class DeleteCarImageUseCase {
  constructor (
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: ICarsImagesRepository,
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  async execute (image_id: string): Promise<void> {
    const image = await this.carsImagesRepository.findById(image_id);

    if (!image) {
      throw new Error('Image not found');
    }

    // delete the image from database
    await this.carsImagesRepository.delete(image_id);

    // delete the image file
    await this.storageProvider.delete(image.image_name, 'cars');
  }
}

export { DeleteCarImageUseCase };
