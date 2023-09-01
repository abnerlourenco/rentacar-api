import { inject, injectable } from 'tsyringe';

import { type Category } from '../../entities/Category';
import { type ICategoryRepository } from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor (
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoryRepository
  ) {}

  async execute (): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
