import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export enum State {
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
}
export class CreateProgressLessonDto {
  @IsNotEmpty()
  @IsUUID()
  lessonId: string;

  @IsNotEmpty()
  @IsEnum(State)
  state: State;
}
