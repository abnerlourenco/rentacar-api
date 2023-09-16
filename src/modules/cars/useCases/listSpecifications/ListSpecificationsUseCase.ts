import { inject, injectable } from 'tsyringe';

import { type Specification } from '../../infra/typeorm/entities/Specification';
import { type ISpecificationRepository } from '../../repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor (
    @inject('SpecificationsRepository')
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute (): Promise<Specification[]> {
    const specification = await this.specificationRepository.list();

    return specification;
  }
}

export { ListSpecificationsUseCase };
