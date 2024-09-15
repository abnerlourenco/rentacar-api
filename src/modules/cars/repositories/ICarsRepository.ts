import { type ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { type Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  create: (data: ICreateCarDTO) => Promise<Car>
  findAllCars: (
    brand?: string,
    category_id?: string,
    name?: string
  ) => Promise<Car[]>
  findByLicensePlate: (license_plate: string) => Promise<Car | null>
  findAvailable: (
    brand?: string,
    category_id?: string,
    name?: string
  ) => Promise<Car[]>
  findById: (car_id: string) => Promise<Car | null>
  updateAvailable: (car_id: string, available: boolean) => Promise<void>
}

export type { ICarsRepository };
