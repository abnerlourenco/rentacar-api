import { instanceToInstance } from 'class-transformer';

import { type IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { type User } from '../infra/typeorm/entities/Users';

function UserMap ({
  email,
  name,
  id,
  avatar,
  driver_license,
  avatar_url
}: User): IUserResponseDTO {
  const user = instanceToInstance({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url
  });

  return user;
}

export { UserMap };
