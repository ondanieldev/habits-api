import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { EmailSendBo } from '../bos/email.bo';
import { getSmtpDefaultEmailUser, getSmtpConfig } from '../config/smtp.config';
import { emailSubjects } from '../constants/email-subjects.contant';
import { EmailParserService } from './email-parser.service';
import { EmailService } from './email.service';

@Injectable()
export class EmailSmtpService implements EmailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly emailParserService: EmailParserService) {
    this.transporter = createTransport(getSmtpConfig());
  }

  async send({ data, from, locale, template, to }: EmailSendBo): Promise<void> {
    await this.transporter.sendMail({
      from: from || getSmtpDefaultEmailUser(),
      to,
      subject: emailSubjects[template][locale],
      text: this.emailParserService.toText({
        data,
        locale,
        template,
      }),
    });
  }
}
