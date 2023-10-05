import { type Car } from '../../infra/typeorm/entities/Car';
import { type ICarsRepository } from '../../repositories/ICarsRepository';

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

class ListCarsUseCase {
  constructor (
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute ({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(brand, category_id, name);

    return cars;
  }
}

export { ListCarsUseCase };
