import { type IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { type User } from '../infra/typeorm/entities/Users';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class UserMap {
  static toDTO ({
    email,
    name,
    id,
    avatar,
    driver_license
  }: User): IUserResponseDTO {
    return {
      email,
      name,
      id,
      avatar,
      driver_license
    };
  }
}

export { UserMap };
