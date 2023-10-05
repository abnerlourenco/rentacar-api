import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

describe('List Cars', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let listCarsUseCase: ListCarsUseCase;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all avaliable cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Teste 0',
      description: 'Carro bem antigo',
      daily_rate: 250.00,
      license_plate: 'ADG-6594',
      fine_amount: 160,
      brand: 'VolksWagem',
      category_id: 'category_id'
    });

    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list all avaliable cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Teste 1',
      description: 'Carro bem antigo',
      daily_rate: 250.00,
      license_plate: 'ADG-6594',
      fine_amount: 160,
      brand: 'VolksWagem',
      category_id: 'category_id'
    });

    const cars = await listCarsUseCase.execute({
      name: 'Teste 1'
    });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all avaliable cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Teste 2',
      description: 'Carro bem antigo',
      daily_rate: 250.00,
      license_plate: 'ADG-6594',
      fine_amount: 160,
      brand: 'Teste Brand',
      category_id: 'category_id'
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Teste Brand'
    });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all avaliable cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Teste 3',
      description: 'Carro bem antigo',
      daily_rate: 250.00,
      license_plate: 'ADG-6594',
      fine_amount: 160,
      brand: 'VolksWagem',
      category_id: 'category test'
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'category test'
    });
    expect(cars).toEqual([car]);
  });
});
