import { type ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { type Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  create: (data: ICreateRentalDTO) => Promise<Rental>
  findOpenRentalByCar: (car_id: string) => Promise<Rental | null>
  findOpenRentalByUser: (user_id: string) => Promise<Rental | null>
  findById: (id: string) => Promise<Rental | null>
  findByUser: (user_id: string) => Promise<Rental[]>
}

export type { IRentalsRepository };
