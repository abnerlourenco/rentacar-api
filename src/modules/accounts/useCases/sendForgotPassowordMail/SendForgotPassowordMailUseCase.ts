import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository';

@injectable()
class SendForgotPassowordMailUseCase {
  constructor (
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private readonly mailProvider: IMailProvider
  ) {}

  async execute (email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User does not exist!');
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id as string,
      expires_date
    });

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      `O link para recuperação de senha é ${token}`
    );
  }
}

export { SendForgotPassowordMailUseCase };
