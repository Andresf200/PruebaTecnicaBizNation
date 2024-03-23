import { IsEnum, IsNotEmpty } from 'class-validator';

export enum State {
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
}
export class UpdateProgressLessonDto {
  @IsNotEmpty()
  @IsEnum(State)
  state: State;
}
