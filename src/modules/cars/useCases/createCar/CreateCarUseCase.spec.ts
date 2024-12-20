import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Test',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category'
    });
    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with a same license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car 1',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category'
    });

    await expect(createCarUseCase.execute({
      name: 'Car 2',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category'
    })
    ).rejects.toEqual(new AppError('Car already exists'));
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car 3',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category'
    });

    expect(car.available).toBe(true);
  });
});
