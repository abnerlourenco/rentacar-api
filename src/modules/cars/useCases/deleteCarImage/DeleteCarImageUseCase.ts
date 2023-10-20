import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { ICarsImagesRepository } from '../../repositories/ICarsImagesRepository';

@injectable()
class DeleteCarImageUseCase {
  constructor (
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute (image_id: string): Promise<void> {
    const image = await this.carsImagesRepository.findById(image_id);

    if (!image) {
      throw new Error('Image not found');
    }

    // delete the image from database
    await this.carsImagesRepository.delete(image_id);

    // delete the image file
    await deleteFile(`./tmp/car-images/${image.image_name}`);
  }
}

export { DeleteCarImageUseCase };
