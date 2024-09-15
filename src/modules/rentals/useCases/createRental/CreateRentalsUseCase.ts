import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { type Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  car_id: string
  user_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor (
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('DayJsDateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute ({
    car_id,
    expected_return_date,
    user_id
  }: IRequest): Promise<Rental> {
    const minimalRentalHour = 24;

    const carNotAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carNotAvailable) {
      throw new AppError('Car is not available');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError('There is a rental open to the same user');
    }

    // Duração minima de 24h
    const dateNow = this.dateProvider.newDate();

    const compareDate = this.dateProvider.compareInHours(dateNow, expected_return_date);

    if (compareDate < minimalRentalHour) {
      throw new AppError('Minimum rental duration must be 24 hours');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
