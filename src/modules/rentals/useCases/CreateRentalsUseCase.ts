import { AppError } from '../../../shared/errors/AppError';
import { type Rental } from '../infra/typeorm/entities/Rental';
import { type IRentalsRepository } from '../repositories/IRentalsRepository';

interface IRequest {
  car_id: string
  user_id: string
  expected_return_date: Date
}

class CreateRentalsUseCase {
  constructor (
    private readonly rentalsRepository: IRentalsRepository
  ) {}

  async execute ({
    car_id,
    expected_return_date,
    user_id
  }: IRequest): Promise<Rental> {
    const carNotAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carNotAvailable) {
      throw new AppError('Car is not available');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError('There is a rental open to the same user');
    }

    // Duração minima de 24h

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id
    });

    return rental;
  }
}

export { CreateRentalsUseCase };
