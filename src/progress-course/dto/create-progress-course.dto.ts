import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export enum State {
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
}

export class CreateProgressCourseDto {
  @IsNotEmpty()
  @IsUUID()
  courseId: string;

  @IsNotEmpty()
  @IsEnum(State)
  state: State;
}
