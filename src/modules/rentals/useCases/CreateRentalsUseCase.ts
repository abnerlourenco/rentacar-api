import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../shared/errors/AppError';
import { type Rental } from '../infra/typeorm/entities/Rental';
import { type IRentalsRepository } from '../repositories/IRentalsRepository';

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
    private readonly dateProvider: IDateProvider
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

    const startRentalDate = this.dateProvider.convertToUTC(dateNow);

    const expectedReturnDate = this.dateProvider.convertToUTC(expected_return_date);

    const compareDate = this.dateProvider.compareInHours(startRentalDate, expectedReturnDate);

    if (compareDate < minimalRentalHour) {
      throw new AppError('Minimum rental duration must be 24 hours');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id
    });

    return rental;
  }
}

export { CreateRentalUseCase };
