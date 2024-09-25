import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { type Rental } from '../../infra/typeorm/entities/Rental';
import { type IRentalsRepository } from '../../repositories/IRentalsRepository';

@injectable()
class ListRentalsByUserUseCase {
  constructor (
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository
  ) {}

  async execute (user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    if (!rentalsByUser) {
      throw new AppError('User do not have rentals');
    }

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
