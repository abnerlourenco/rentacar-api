import { container } from 'tsyringe';

import '../providers/index';

import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { type IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { CarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { type ICarsImagesRepository } from '../../modules/cars/repositories/ICarsImagesRepository';
import { type ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { type ICategoryRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { type ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationsRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepositories';
import { type IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ICarsRepository>(
  'CarsRepository',
  CarsRepository
);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);
