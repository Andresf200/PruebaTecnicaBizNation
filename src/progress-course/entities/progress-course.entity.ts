import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Course } from 'src/course/entities/course.entity';
import { User } from 'src/user/entities/user.entity';
import { DataType } from 'sequelize-typescript';

export enum State {
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
}

@Table({ tableName: 'progress_course' })
export class ProgressCourse extends Model {
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

  @ForeignKey(() => Course)
  @Column(DataType.UUID)
  courseId: string;

  @BelongsTo(() => Course)
  course: Course;

  @Column({
    type: DataType.ENUM(...Object.values(State)),
    defaultValue: State.PENDING,
  })
  state: string;

  @Column({ type: DataType.DATE, allowNull: true })
  date_completed: Date | null;
}
