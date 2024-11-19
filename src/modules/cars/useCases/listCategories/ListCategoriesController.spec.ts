import { hash } from 'bcrypt';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import { connection } from '../../../../shared/infra/typeorm';

describe('Create Category controller', () => {
  beforeAll(async () => {
    if (!connection.isInitialized) {
      await connection.initialize();
    }

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

  it('Should be able to list all categories', async () => {
    const responseToken = await request(app)
      .post('/session')
      .send({
        email: 'admin@admin.com',
        password: 'admin'
      });

    const { refresh_token } = await responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'this is a category supertest'
      }).set({
        Authorization: `Bearer ${refresh_token as string}`
      });

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest2',
        description: 'this is a category supertest2'
      }).set({
        Authorization: `Bearer ${refresh_token as string}`
      });

    const response = await request(app).get('/categories');

    // console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[1]).toHaveProperty('id');
    expect(response.body[1].name).toEqual('Category Supertest2');
  });
});
