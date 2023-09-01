import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoriesUseCase } from './ImportCategoriesUseCase';

class ImportCategoriesController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);

    if (!file) {
      return response.json({ message: 'Bad Request - file not found' });
    }

    await importCategoriesUseCase.execute(file);
    return response.status(200).send();
  }
}

export { ImportCategoriesController };
