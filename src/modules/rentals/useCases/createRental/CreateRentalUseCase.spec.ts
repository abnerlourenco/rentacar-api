import dayjs from 'dayjs';

import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../../cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '../../repositories/InMemory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalsUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const expectedReturnAdd24Hours = dayjs().add(1, 'day').toDate();

  const expectedReturnLessThan24Hours = dayjs().add(Math.floor(Math.random() * 23), 'hour').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car test',
      daily_rate: 60,
      license_plate: 'test',
      fine_amount: 25,
      brand: 'brand',
      category_id: '1234'
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id as string,
      expected_return_date: expectedReturnAdd24Hours,
      user_id: '654321'
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is rental open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1231456',
      expected_return_date: expectedReturnAdd24Hours,
      user_id: '654321'
    });

    await expect(createRentalUseCase.execute({
      car_id: 'carro 1',
      expected_return_date: expectedReturnAdd24Hours,
      user_id: '654321'
    })
    ).rejects.toEqual(new AppError('There is a rental open to the same user'));
  });

  it('should not be able to create a new rental if there is rental open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1234',
      expected_return_date: expectedReturnAdd24Hours,
      user_id: '654321'
    });

    await expect(createRentalUseCase.execute({
      car_id: '1234',
      expected_return_date: expectedReturnAdd24Hours,
      user_id: '123456'
    })
    ).rejects.toEqual(new AppError('Car is not available'));
  });

  it('should not be able to create a new rental if expected return date is less than 24 hours', async () => {
    await expect(createRentalUseCase.execute({
      car_id: 'test',
      expected_return_date: expectedReturnLessThan24Hours,
      user_id: '654321'
    })
    ).rejects.toEqual(new AppError('Minimum rental duration must be 24 hours'));
  });
});
