
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ListCarsController } from '../../../../modules/cars/useCases/listCars/ListCarsController';
import { UploadCarImagesController } from '../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { ensureAdmin } from '../middleware/ensureAdmin';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const carsRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp/car-images'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.get('/available', listAvailableCarsController.handle);

// a partir daqui, necessita autenticação do usuário
carsRoutes.use(ensureAuthenticated);
// a partir daqui, necessita ser admin
carsRoutes.use(ensureAdmin);

carsRoutes.post('/',
  createCarController.handle
);

carsRoutes.get('/list-all',
  listCarsController.handle
);

carsRoutes.post('/specifications/:id',
  createCarSpecificationController.handle
);

carsRoutes.post('/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'), // mesmo nome da variavel que recebe no controller
  uploadCarImagesController.handle
);

export { carsRoutes };
