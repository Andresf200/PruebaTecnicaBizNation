import {
  IsDate,
  IsIn,
  IsString,
  MinLength,
  IsEmail,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  full_name: string;

  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha.' })
  date_birth: Date;

  @IsEmail({}, { message: 'El email debe ser un email válido.' })
  email: string;

  @IsString({ message: 'El rol debe ser una cadena de texto.' })
  @IsIn(['student', 'admin'], {
    message: 'El rol debe ser estudiante o administador.',
  })
  role: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una letra mayúscula, una letra minúscula y un número.',
  })
  password: string;
}
