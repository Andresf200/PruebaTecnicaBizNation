import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { User } from 'src/user/entities/user.entity';

export enum State {
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
}

@Table({ tableName: 'progress_lesson' })
export class ProgressLesson extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Lesson)
  @Column(DataType.UUID)
  lessonId: string;

  @BelongsTo(() => Lesson)
  lesson: Lesson;

  @Column({
    type: DataType.ENUM(...Object.values(State)),
    defaultValue: State.PENDING,
  })
  state: string;
}
