import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { ProgressCourse } from 'src/progress-course/entities/progress-course.entity';
import { ProgressLesson } from 'src/progress-lesson/entities/progress-lesson.entity';

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
}

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column(DataType.TEXT)
  full_name: string;

  @Column(DataType.DATE)
  date_birth: Date;

  @Column(DataType.TEXT)
  email: string;

  @Column(DataType.TEXT)
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.STUDENT,
  })
  role: string;

  @HasMany(() => ProgressLesson)
  progressLessons: ProgressLesson[];

  @HasMany(() => ProgressCourse)
  progressCourses: ProgressCourse[];
}
