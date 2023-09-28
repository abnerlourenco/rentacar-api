import { type Repository } from 'typeorm';

import { connection } from '../../../../../shared/infra/typeorm';
import { type ICreateSpecificationDTO, type ISpecificationRepository } from '../../../repositories/ISpecificationsRepository';
import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationRepository {
  private readonly repository: Repository<Specification>;

  constructor () {
    this.repository = connection.getRepository(Specification);
  }

  async create ({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description
    });

    await this.repository.save(specification);
  }

  async list (): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }

  async findByName (name: string): Promise<Specification | null> {
    const specification = await this.repository.findOneBy({ name });

    return specification;
  }
}

export { SpecificationsRepository };
