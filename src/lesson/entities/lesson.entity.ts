import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Course } from 'src/course/entities/course.entity';
import { ProgressLesson } from 'src/progress-lesson/entities/progress-lesson.entity';

@Table({ tableName: 'lessons', paranoid: true })
export class Lesson extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.TEXT)
  link_video: string;

  @ForeignKey(() => Course)
  @Column(DataType.UUID)
  courseId: string;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => ProgressLesson)
  progressLessons: ProgressLesson[];
}
