import { inject } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { type Rental } from '../../infra/typeorm/entities/Rental';
import { type IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  id: string
  user_id: string
}

class DevolutionRentalUseCase {
  constructor (
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute ({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const minimum_daily = 1; // one day

    if (!rental) {
      throw new AppError('Rental not found');
    }

    const car = await this.carsRepository.findById(rental.car_id);
    if (!car) {
      throw new AppError('Car not found');
    }

    // Verificar o tempo de aluguel
    const dateNow = this.dateProvider.newDate();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      dateNow
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total_daily = 0;
    let calculate_fine = 0;

    if (delay > 0) {
      calculate_fine = delay * car.fine_amount;
    }

    total_daily = ((daily * car.daily_rate) + calculate_fine);

    rental.end_date = this.dateProvider.newDate();
    rental.total = total_daily;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(rental.car_id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
