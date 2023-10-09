import { Specification } from '../../infra/typeorm/entities/Specification';
import { type ICreateSpecificationDTO, type ISpecificationRepository } from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];
  async create ({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByIds (ids: string[]): Promise<Specification[]> {
    const allSpecification = this.specifications
      .filter((item) => ids.includes(item.id as string));

    return allSpecification;
  }

  async list (): Promise<Specification[]> {
    const all = this.specifications;

    return all;
  }

  async findByName (name: string): Promise<Specification | null> {
    const specification = this.specifications.find(specification => specification.name === name);

    if (!specification) {
      return null;
    }

    return specification;
  }
}

export { SpecificationsRepositoryInMemory };
