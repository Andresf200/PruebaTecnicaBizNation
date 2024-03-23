import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateLessonDto {
  @IsString({ message: 'El título debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El título no debe estar vacío.' })
  title: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción no debe estar vacía.' })
  description: string;

  @IsString({ message: 'El video debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El video no debe estar vacío.' })
  link_video: string;

  @IsOptional()
  @IsUUID('4', { message: 'El id del curso debe ser un UUID.' })
  id?: string;
}
