import { type CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create: (car_id: string, image_name: string) => Promise<CarImage>
  list: (car_id: string) => Promise<CarImage[]>
  delete: (car_id: string, image_name: string) => Promise<void>
}

export type { ICarsImagesRepository };
