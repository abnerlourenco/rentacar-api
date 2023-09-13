import { AppError } from '../../../../errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Criar categoria', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('shoudt be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'Category test description'
    };
    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('shoudt not be able to create a same category name', async () => {
    void expect(async () => {
      const category = {
        name: 'Category test',
        description: 'Category test description'
      };
      await createCategoryUseCase.execute(category);

      await createCategoryUseCase.execute(category);
    }
    ).rejects.toBeInstanceOf(AppError);
  });
});
