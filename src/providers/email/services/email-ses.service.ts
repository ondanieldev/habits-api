import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { EmailSendBo } from '../bos/email.bo';
import { getSesDefaultEmailUser, getSesConfig } from '../config/ses.config';
import { emailSubjects } from '../constants/email-subjects.contant';
import { EmailParserService } from './email-parser.service';
import { EmailService } from './email.service';

@Injectable()
export class EmailSesService implements EmailService {
  private transporter: AWS.SES;

  constructor(private readonly emailParserService: EmailParserService) {
    this.transporter = new AWS.SES(getSesConfig());
  }

  async send({ data, locale, template, to, from }: EmailSendBo): Promise<void> {
    const defaultEmailUser = getSesDefaultEmailUser();

    const params: AWS.SES.SendEmailRequest = {
      Destination: {
        ToAddresses: [to.address],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: this.emailParserService.toText({
              data,
              locale,
              template,
            }),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: emailSubjects[template][locale],
        },
      },
      Source: from ? from.address : defaultEmailUser.address,
    };

    await this.transporter.sendEmail(params).promise();
  }
}
