/* eslint-disable @typescript-eslint/method-signature-style */
import { type Category } from '../infra/typeorm/entities/Category';

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoryRepository {
  findByName(name: string): Promise<Category | null>
  list(): Promise<Category[]>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
}

export type { ICreateCategoryDTO, ICategoryRepository };
