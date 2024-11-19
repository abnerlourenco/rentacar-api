import { type ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../../infra/typeorm/entities/UserTokens';
import { type IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];
  async create ({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken (user_id: string, refresh_token: string): Promise<UserTokens | null> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.user_id === user_id && userToken.refresh_token === refresh_token
    );
    if (!userToken) {
      return null;
    }

    return userToken;
  }

  async deleteById (id: string): Promise<void> {
    const userToken = this.usersTokens.find(userToken => userToken.id === id);

    if (userToken) {
      this.usersTokens.splice(this.usersTokens.indexOf(userToken));
    }
  }

  async findByRefreshToken (refresh_token: string): Promise<UserTokens | null> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    if (!userToken) {
      return null;
    }

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
