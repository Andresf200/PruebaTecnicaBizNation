import { Injectable } from '@nestjs/common';
import { DataEmailDto } from './dto/data-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendEmail(dataEmail: DataEmailDto): Promise<void> {
    const { to, subject, user } = dataEmail;

    await this.mailerService.sendMail({
      to,
      subject,
      template: './register.html',
      context: {
        name: user.full_name,
      },
    });
  }
}
