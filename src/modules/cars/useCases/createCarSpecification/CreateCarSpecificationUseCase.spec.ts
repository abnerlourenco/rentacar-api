import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '../../repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });
  it('should not be able to add a new specification to non-existent car', async () => {
    void expect(async () => {
      const car_id = '123456';
      const specifications_id = ['654321'];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 3',
      description: 'description car',
      daily_rate: 100,
      license_plate: 'ABCD-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category'
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test'
    });

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id as string,
      specifications_id: [specification.id as string]
    });
    expect(specificationCars).toHaveProperty('specifications');
    expect(specificationCars.specifications.length).toBe(1);
  });
});
