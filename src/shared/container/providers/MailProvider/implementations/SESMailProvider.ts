import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { type Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { SendRawEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

import { type IMailProvider } from '../IMailProvider';

@injectable()
class SESMailProvider implements IMailProvider {
  private readonly client: Transporter;

  constructor () {
    const ses = new SESClient({
      region: process.env.AWS_REGION,
      credentials: defaultProvider()
    });

    this.client = nodemailer.createTransport({
      SES: {
        ses,
        aws: {
          SendRawEmailCommand
        }
      }
    });
  }

  async sendMail (to: string, subject: string, variables: any, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx <no-reply@dinheironalinha.com.br>',
      subject,
      html: templateHTML
    });
  }
}

export { SESMailProvider };
