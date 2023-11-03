import dayjs from 'dayjs';

import { AppError } from '../../../shared/errors/AppError';
import { DayjsDateProvider } from '../../../shared/providers/DateProvider/implementations/DayjsDateProvider';
import { RentalsRepositoryInMemory } from '../repositories/InMemory/RentalsRepositoryInMemory';
import { CreateRentalsUseCase } from './CreateRentalsUseCase';

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const expectedReturnAdd24Hours = dayjs().add(1, 'day').toDate();

  const expectedReturnLessThan24Hours = dayjs().add(Math.floor(Math.random() * 23), 'hour').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalsUseCase = new CreateRentalsUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalsUseCase.execute({
      car_id: '123456',
      expected_return_date: expectedReturnAdd24Hours,
      user_id: '654321'
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is rental open to the same user', async () => {
    void expect(async () => {
      await createRentalsUseCase.execute({
        car_id: '123456',
        expected_return_date: expectedReturnAdd24Hours,
        user_id: '654321'
      });

      await createRentalsUseCase.execute({
        car_id: '123456',
        expected_return_date: expectedReturnAdd24Hours,
        user_id: '654321'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is rental open to the same car', async () => {
    void expect(async () => {
      await createRentalsUseCase.execute({
        car_id: 'test',
        expected_return_date: expectedReturnAdd24Hours,
        user_id: '654321'
      });

      await createRentalsUseCase.execute({
        car_id: 'test',
        expected_return_date: expectedReturnAdd24Hours,
        user_id: '654321'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if expected return date is less than 24 hours', async () => {
    void expect(async () => {
      await createRentalsUseCase.execute({
        car_id: 'test',
        expected_return_date: expectedReturnLessThan24Hours,
        user_id: '654321'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
