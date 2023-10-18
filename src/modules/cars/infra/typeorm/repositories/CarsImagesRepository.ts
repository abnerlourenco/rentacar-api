import { type Repository } from 'typeorm';

import { connection } from '../../../../../shared/infra/typeorm';
import { type ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository';
import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private readonly repository: Repository<CarImage>;

  constructor () {
    this.repository = connection.getRepository(CarImage);
  }

  async create (car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
