
import { type ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { type ICarsRepository } from '../../repositories/ICarsRepository';

class CreateCarUseCase {
  constructor (
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
  }: ICreateCarDTO): Promise<void> {
    await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });
  }
}

export { CreateCarUseCase };
