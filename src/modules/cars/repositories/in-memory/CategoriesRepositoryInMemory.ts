import { Category } from '../../infra/typeorm/entities/Category';
import { type ICreateCategoryDTO, type ICategoryRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async findByName (name: string): Promise<Category | null> {
    const category = this.categories.find(category => category.name === name);
    if (category) {
      return category;
    }

    return null;
  }

  async create ({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description
    });

    this.categories.push(category);
  }

  async list (): Promise<Category[]> {
    const list = this.categories;

    return list;
  }
}

export { CategoriesRepositoryInMemory };
