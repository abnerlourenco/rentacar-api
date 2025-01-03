import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  async execute ({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth;

    if (!user) {
      throw new AppError('Email or password incorrect!', 401);
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      throw new AppError('Email or password incorrect!', 401);
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id: user.id as string,
      refresh_token,
      expires_date
    });

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email
      }
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
