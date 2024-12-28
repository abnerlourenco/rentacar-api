import { container } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { type IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
};

if (process.env.MAIL_PROVIDER === undefined) {
  throw new AppError('MAIL_PROVIDER variable is undefined');
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER]
);
