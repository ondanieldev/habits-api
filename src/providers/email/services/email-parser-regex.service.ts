import { EmailParserToTextBo } from '../bos/email-parser.bo';
import { regexTexts } from '../constants/regex.contant';
import { EmailParserService } from './email-parser.service';

export class EmailParserRegexService implements EmailParserService {
  toText({ data, locale, template }: EmailParserToTextBo) {
    return Object.entries(data).reduce((text, [key, value]) => {
      return text.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }, regexTexts[template][locale]);
  }
}
