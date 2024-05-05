import { DataSource } from 'typeorm';

export const connection = new DataSource({
  type: 'postgres',
  // host: 'postgres',
  host: 'localhost',
  port: 5432,
  database: process.env.NODE_ENVIROMENT_AMBIENT === '1' ? 'rentacar_test' : 'rentacar',
  username: 'docker',
  password: 'admin',
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts']
});

connection.initialize()
  .then(() => {
    process.env.NODE_ENVIROMENT_AMBIENT === '1'
      ? console.log('Data Source Teste has been initialized successfully.')
      : console.log('Data Source has been initialized successfully.');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
