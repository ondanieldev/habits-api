import { EmailSendBo } from '../bos/email.bo';

export class EmailService {
  send: (data: EmailSendBo) => Promise<void>;
}
