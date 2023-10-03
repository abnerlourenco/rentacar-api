import { hash } from 'bcrypt';

import { connection } from '..';

import { v4 as uuidv4 } from 'uuid';

async function create () {
  const id = uuidv4();
  const password = await hash('admin', 8);

  await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at) 
        VALUES('${id}','admin','admin@admin.com', '${password}', true, '123456789', 'now()')`
  );
}

void create().then(() => {
  console.log('User admin created');
});
