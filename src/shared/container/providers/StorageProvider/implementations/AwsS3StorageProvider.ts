import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import upload from '../../../../../config/upload';
import { AppError } from '../../../../errors/AppError';
import { type IStorageProvider } from '../IStorageProvider';

class AwsS3StorageProvider implements IStorageProvider {
  private readonly client: S3Client;

  constructor () {
    this.client = new S3Client({
      region: process.env.AWS_BUCKET_REGION
    });
  }

  async save (file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);

    if (ContentType === null) {
      throw new AppError('Content file type is null');
    }

    if (process.env.AWS_BUCKET_NAME === undefined) {
      throw new AppError('AWS_BUCKET_NAME is undefined');
    }

    await this.client.send(new PutObjectCommand({
      Bucket: `${process.env.AWS_BUCKET_NAME}`,
      Key: `${folder}/${file}`,
      ACL: 'public-read-write',
      Body: fileContent,
      ContentType
    })
    );

    await fs.promises.unlink(originalName);

    return file;
  }

  async delete (file: string, folder: string): Promise<void> {
    if (process.env.AWS_BUCKET_NAME === undefined) {
      throw new AppError('AWS_BUCKET_NAME variable is undefined');
    }

    await this.client.send(new DeleteObjectCommand({
      Bucket: `${process.env.AWS_BUCKET_NAME}`,
      Key: `${folder}/${file}`
    })
    );
  }
}

export { AwsS3StorageProvider };
