import { hash } from 'bcrypt';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import { connection } from '../../../../shared/infra/typeorm';

describe('Create Category controller', () => {
  beforeAll(async () => {
    const id = uuidv4();
    const password = await hash('admin', 8);

    await connection.runMigrations();

    await connection.query(
          `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at) 
          VALUES('${id}','admin','admin@admin.com', '${password}', true, '123456789', 'now()')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it('Should be able to create a new category', async () => {
    const responseToken = await request(app).post('/session').send({
      email: 'admin@admin.com',
      password: 'admin'
    });

    const { token } = responseToken.body;

    const response = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'this is a category supertest'
    }).set({
      Authorization: `bearer ${token as string}`
    });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new category with same name', async () => {
    const responseToken = await request(app).post('/session').send({
      email: 'admin@admin.com',
      password: 'admin'
    });

    const { token } = responseToken.body;

    const response = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'this is a category supertest'
    }).set({
      Authorization: `bearer ${token as string}`
    });

    expect(response.status).toBe(400);
  });
});
