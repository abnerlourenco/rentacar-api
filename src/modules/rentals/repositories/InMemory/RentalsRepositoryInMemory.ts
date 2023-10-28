import { type ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { type IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create ({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar (car_id: any): Promise<Rental | null> {
    const openRental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    if (!openRental) {
      return null;
    }

    return openRental;
  }

  async findOpenRentalByUser (user_id: any): Promise<Rental | null> {
    const openRental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    if (!openRental) {
      return null;
    }

    return openRental;
  }
}

export { RentalsRepositoryInMemory };
