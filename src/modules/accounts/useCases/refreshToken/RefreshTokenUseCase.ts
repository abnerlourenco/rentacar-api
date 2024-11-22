import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor (
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute (refresh_token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(refresh_token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth;

    // Verify that the refresh token is valid, can be used to validate ip address, MAC::ADDRESS, quantity simultan access
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, refresh_token);

    if (!userToken) {
      throw new AppError('Refresh Token does not exist!');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const new_refresh_token = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date
    });

    const token = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    });

    return {
      refresh_token: new_refresh_token,
      token
    };
  }
}

export { RefreshTokenUseCase };
