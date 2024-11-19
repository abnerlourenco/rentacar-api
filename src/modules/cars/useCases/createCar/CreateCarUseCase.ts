import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { type ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { type Car } from '../../infra/typeorm/entities/Car';
import { type ICarsRepository } from '../../repositories/ICarsRepository';

@injectable()
class CreateCarUseCase {
  constructor (
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute ({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);
    // console.log(carAlreadyExists);
    if (carAlreadyExists) {
      throw new AppError('Car already exists');
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });

    return car;
  }
}

export { CreateCarUseCase };
