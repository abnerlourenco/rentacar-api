import { container } from 'tsyringe';

import { AppError } from '../../errors/AppError';
import { type IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { type IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { AwsS3StorageProvider } from './StorageProvider/implementations/AwsS3StorageProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { type IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  'EtherealMailProvider',
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: AwsS3StorageProvider
};

if (process.env.DISK === undefined) {
  throw new AppError('DISK variable is undefined');
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK]
);
