import { type Repository } from 'typeorm';

import { connection } from '../../../../../shared/typeorm';
import { type ICategoryRepository, type ICreateCategoryDTO } from '../../../repositories/ICategoriesRepository';
import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoryRepository {
  private readonly repository: Repository<Category>;

  constructor () {
    this.repository = connection.getRepository(Category);
  }

  async create ({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    });

    await this.repository.save(category);
  }

  async list (): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName (name: string): Promise<Category | null> {
    const category = await this.repository.findOneBy({ name });
    return category;
  }
}

export { CategoriesRepository };
