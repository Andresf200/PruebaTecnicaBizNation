import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  MinDate,
  ValidateNested,
} from 'class-validator';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';

export class CreateCourseDto {
  @IsString({ message: 'El logo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El logo no debe estar vacío.' })
  logo: string;

  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El título no debe estar vacío.' })
  title: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción no debe estar vacía.' })
  description: string;

  @IsDate({ message: 'La fecha de publicación debe ser una fecha.' })
  @MinDate(new Date())
  @Transform(({ value }) => new Date(value))
  date_published: Date;

  @IsString({
    message: 'El video de introducción debe ser una cadena de texto.',
  })
  @IsNotEmpty({ message: 'El video de introducción no debe estar vacío.' })
  introduction_video: string;

  @ValidateNested({ each: true })
  @Type(() => CreateLessonDto)
  lessons: CreateLessonDto[];
}
