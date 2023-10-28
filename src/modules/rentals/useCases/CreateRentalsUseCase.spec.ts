import { AppError } from '../../../shared/errors/AppError';
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
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is rental open to the same user', async () => {
    void expect(async () => {
      await createRentalsUseCase.execute({
        car_id: '123456',
        expected_return_date: new Date(),
        user_id: '654321'
      });

      await createRentalsUseCase.execute({
        car_id: '123456',
        expected_return_date: new Date(),
        user_id: '654321'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is rental open to the same car', async () => {
    void expect(async () => {
      await createRentalsUseCase.execute({
        car_id: 'test',
        expected_return_date: new Date(),
        user_id: '654321'
      });

      await createRentalsUseCase.execute({
        car_id: 'test',
        expected_return_date: new Date(),
        user_id: '654321'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
