import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/repositories/ICarsRepository';
import { type Rental } from '../../infra/typeorm/entities/Rental';
import { type IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
  id: string
  user_id: string
}

@injectable()
class DevolutionRentalUseCase {
  constructor (
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('DayJsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute ({ id }: IRequest): Promise<[Rental, string]> {
    const rental = await this.rentalsRepository.findById(id);
    const minimum_daily = 1; // one day

    if (!rental) {
      throw new AppError('Rental not found');
    }

    if (rental.end_date) {
      throw new AppError('Rental alredy is devolution');
    }

    const car = await this.carsRepository.findById(rental.car_id);
    if (!car) {
      throw new AppError('Car not found');
    }

    // Data final do aluguel
    const endDateRental = this.dateProvider.newDate();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      endDateRental
    );

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      endDateRental
    );

    let total_daily = 0;
    let calculate_fine = 0;

    if (delay > 0) {
      calculate_fine = delay * car.fine_amount;
    }

    total_daily = ((daily * car.daily_rate) + calculate_fine);

    const extrato = (`(${daily} dias * ${car.daily_rate} diária)=${daily * car.daily_rate} + (${delay} * ${car.fine_amount})=${calculate_fine} \n 
      de Multa - Total geral = ${total_daily}`);

    rental.end_date = endDateRental;
    rental.total = total_daily;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(rental.car_id, true);

    return [rental, extrato];
  }
}

export { DevolutionRentalUseCase };
