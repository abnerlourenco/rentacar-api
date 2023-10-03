import { type Repository } from 'typeorm';

import { connection } from '../../../../../shared/infra/typeorm';
import { type ICreateCarDTO } from '../../../dtos/ICreateCarDTO';
import { type ICarsRepository } from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private readonly repository: Repository<Car>;

  constructor () {
    this.repository = connection.getRepository(Car);
  }

  async create ({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate (license_plate: string): Promise<Car | null> {
    const car = await this.repository.findOneBy({ license_plate });

    return car;
  }
}

export { CarsRepository };
