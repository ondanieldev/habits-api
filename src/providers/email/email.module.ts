import { Module } from '@nestjs/common';

import { EmailParserRegexService } from './services/email-parser-regex.service';
import { EmailParserService } from './services/email-parser.service';
import { EmailSmtpService } from './services/email-smtp.service';
import { EmailService } from './services/email.service';

@Module({
  exports: [EmailService],
  providers: [
    {
      provide: EmailService,
      useClass: EmailSmtpService,
    },
    {
      provide: EmailParserService,
      useClass: EmailParserRegexService,
    },
  ],
})
export class EmailModule {}
