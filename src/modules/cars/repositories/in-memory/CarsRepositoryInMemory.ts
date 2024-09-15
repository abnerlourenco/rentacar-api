import { type ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { type ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create ({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications
    });

    this.cars.push(car);

    return car;
  }

  async findAllCars (
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    if (brand && category_id && name) {
      const cars = this.cars
        .filter(car => {
          if (
            (brand && car.brand === brand) ??
            (category_id && car.category_id === category_id) ??
            (name && car.name === name)
          ) {
            return car;
          }
          return null;
        });
      return cars;
    }

    return this.cars;
  }

  async findByLicensePlate (license_plate: string): Promise<Car | null> {
    const car = this.cars.find(car => car.license_plate === license_plate);
    if (car) {
      return car;
    }
    return null;
  }

  async findAvailable (
    brand: string,
    category_id: string,
    name: string
  ): Promise<Car[]> {
    const cars = this.cars
      .filter(car => {
        if (car.available ||
          ((brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name))
        ) {
          return car;
        }
        return null;
      }
      );

    return cars;
  }

  async findById (car_id: string): Promise<Car | null> {
    const car = this.cars.find(car => car.id === car_id);

    if (!car) {
      return null;
    }

    return car;
  }

  async updateAvailable (car_id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === car_id);
    this.cars[findIndex].available = available;
  }
}
export { CarsRepositoryInMemory };
