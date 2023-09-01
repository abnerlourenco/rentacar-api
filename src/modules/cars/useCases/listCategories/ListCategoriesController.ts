import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const listCategoryUseCase = container.resolve(ListCategoriesUseCase);

      const all = await listCategoryUseCase.execute();

      return response.status(200).json(all);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { ListCategoriesController };
