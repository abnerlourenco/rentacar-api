import { inject, injectable } from 'tsyringe';

import { type Car } from '../../infra/typeorm/entities/Car';
import { type ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
class ListCarsUseCase {
  constructor (
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute ({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAllCars(brand, category_id, name);

    return cars;
  }
}

export { ListCarsUseCase };
