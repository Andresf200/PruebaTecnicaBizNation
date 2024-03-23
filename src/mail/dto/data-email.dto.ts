import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class DataEmailDto {
  @IsEmail()
  @IsString()
  to: string;

  @IsEmail()
  @IsString()
  subject: string;

  user: User;
}
