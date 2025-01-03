import { type IMailProvider } from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private readonly message: any[] = [];

  async sendMail (
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path
    });
  }
}

export { MailProviderInMemory };
