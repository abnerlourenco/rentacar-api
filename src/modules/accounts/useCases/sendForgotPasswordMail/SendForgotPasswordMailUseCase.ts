import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('MailProvider')
    private readonly mailProvider: IMailProvider
  ) {}

  async execute (email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');

    if (!user) {
      throw new AppError('User does not exist!');
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id as string,
      expires_date
    });

    if (!process.env.FORGOT_MAIL_URL) {
      throw new AppError('FORGOT_MAIL_URL is missing');
    }

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath
    );
  }
}

export { SendForgotPasswordMailUseCase };
