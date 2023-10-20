/* eslint-disable @typescript-eslint/method-signature-style */
import { type Specification } from '../infra/typeorm/entities/Specification';

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification | null>
  list(): Promise<Specification[]>
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>
  findByIds(ids: string[]): Promise<Specification[]>
}

export type { ICreateSpecificationDTO, ISpecificationRepository };
