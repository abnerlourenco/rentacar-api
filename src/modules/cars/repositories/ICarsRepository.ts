import { type ICreateCarDTO } from '../dtos/ICreateCarDTO';

interface ICarsRepository {
  create: (data: ICreateCarDTO) => Promise<void>
}

export type { ICarsRepository };
