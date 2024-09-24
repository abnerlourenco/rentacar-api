import { DataSource } from 'typeorm';

export const connection = new DataSource({
  type: 'postgres',
  // host: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'rentacar',
  username: 'docker',
  password: 'admin',
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts']
});

connection.initialize()
  .then(() => {
    console.log('Data Source has been initialized successfully.');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
