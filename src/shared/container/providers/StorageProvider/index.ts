import { container } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { AwsS3StorageProvider } from './implementations/AwsS3StorageProvider';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { type IStorageProvider } from './IStorageProvider';

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
