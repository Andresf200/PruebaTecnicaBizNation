import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { ProgressCourse } from 'src/progress-course/entities/progress-course.entity';

@Table({ tableName: 'courses', paranoid: true })
export class Course extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column(DataType.TEXT)
  logo: string;

  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.DATE)
  date_published: Date;

  @Column(DataType.TEXT)
  introduction_video: string;

  @HasOne(() => ProgressCourse)
  progressCourses: ProgressCourse;

  @HasMany(() => Lesson)
  lessons: Lesson[];
}
