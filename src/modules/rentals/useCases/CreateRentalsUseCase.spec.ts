import { RentalsRepositoryInMemory } from '../repositories/InMemory/RentalsRepositoryInMemory';
import { CreateRentalsUseCase } from './CreateRentalsUseCase';

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalsUseCase = new CreateRentalsUseCase(rentalsRepositoryInMemory);
  });
  it('should be able to create a new rental', async () => {
    const rental = await createRentalsUseCase.execute({
      car_id: '123456',
      expected_return_date: new Date(),
      user_id: '654321'
    });

    expect(rental).toHaveProperty('id');
  });
});
