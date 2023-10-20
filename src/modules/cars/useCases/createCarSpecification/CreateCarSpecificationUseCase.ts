import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { type Car } from '../../infra/typeorm/entities/Car';
import { type ICarsRepository } from '../../repositories/ICarsRepository';
import { type ISpecificationRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor (
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationRepository
  ) {}

  async execute ({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exist');
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id);

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
