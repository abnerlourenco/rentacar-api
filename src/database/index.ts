import { DataSource } from 'typeorm';

import { User } from '../modules/accounts/entities/Users';
import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';

export const connection = new DataSource({
  type: 'postgres',
  host: 'postgres',
  // host: 'localhost',
  port: 5432,
  database: 'rentacar',
  username: 'docker',
  password: 'admin',
  entities: [Category, Specification, User],
  migrations: ['./src/database/migrations/*.ts']
});

connection.initialize()
  .then(() => {
    console.log('Data Source has been initialized successfully.');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
