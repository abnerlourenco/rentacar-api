import { type ICreateRentalDTO } from '../../dtos/ICreateRentalDTO';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { type IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create ({ car_id, user_id, expected_return_date, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      id,
      end_date,
      user_id,
      total,
      expected_return_date,
      start_date: new Date()
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar (car_id: string): Promise<Rental | null> {
    const openRental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    if (!openRental) {
      return null;
    }

    return openRental;
  }

  async findOpenRentalByUser (user_id: string): Promise<Rental | null> {
    const openRental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    if (!openRental) {
      return null;
    }

    return openRental;
  }

  async findById (id: string): Promise<Rental | null> {
    const rental = this.rentals.find(rental => rental.id === id);

    if (!rental) {
      return null;
    }
    return rental;
  }

  async findByUser (user_id: string): Promise<Rental[]> {
    const rental = this.rentals.filter(rental => rental.user_id === user_id);

    return rental;
  }
}

export { RentalsRepositoryInMemory };
