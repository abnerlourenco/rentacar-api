import { type Repository } from 'typeorm';

import { connection } from '../../../../../shared/infra/typeorm';
import { type ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO';
import { type IRentalsRepository } from '../../../repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private readonly repository: Repository<Rental>;

  constructor () {
    this.repository = connection.getRepository(Rental);
  }

  async create ({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    id,
    expected_total_amount
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      end_date,
      id
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar (car_id: string): Promise<Rental | null> {
    const openByCar = await this.repository.findOneBy({ car_id });

    return openByCar;
  }

  async findOpenRentalByUser (user_id: string): Promise<Rental | null> {
    const openByUser = await this.repository.findOneBy({ user_id });

    return openByUser;
  }

  async findById (id: string): Promise<Rental | null> {
    const rental = await this.repository.findOneBy({ id });

    return rental;
  }
}

export { RentalsRepository };
