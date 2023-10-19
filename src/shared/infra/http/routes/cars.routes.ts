
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { DeleteCarImageController } from '../../../../modules/cars/useCases/deleteCarImage/DeleteCarImageController';
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ListCarImagesController } from '../../../../modules/cars/useCases/listCarImages/ListCarImagesController';
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
const deleteCarImageController = new DeleteCarImageController();
const listCarImagesController = new ListCarImagesController();

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post('/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/list-all',
  ensureAuthenticated,
  ensureAdmin,
  listCarsController.handle
);

carsRoutes.post('/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post('/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'), // mesmo nome da variavel que recebe no controller
  uploadCarImagesController.handle
);

carsRoutes.delete('/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteCarImageController.handle
);

carsRoutes.get('/imagens',
  listCarImagesController.handle
);

export { carsRoutes };
