import { Router } from 'express';
import Multer from 'multer';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoriesController } from '../../../../modules/cars/useCases/importCategories/ImportCategoriesController';
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '../middleware/ensureAdmin';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = Multer({
  dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post('/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoriesController.handle
);

export { categoriesRoutes };
