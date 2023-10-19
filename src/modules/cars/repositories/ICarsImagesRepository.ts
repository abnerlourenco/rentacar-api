import { type CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagesRepository {
  create: (car_id: string, image_name: string) => Promise<CarImage>
  list: () => Promise<CarImage[]>
  findById: (image_id: string) => Promise<CarImage | null>
  delete: (image_name: string) => Promise<void>
}

export type { ICarsImagesRepository };
