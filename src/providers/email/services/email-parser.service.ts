import { EmailParserToTextBo } from '../bos/email-parser.bo';

export class EmailParserService {
  toText: (data: EmailParserToTextBo) => string;
}
