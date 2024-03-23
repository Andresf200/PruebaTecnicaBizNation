import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { ProgressCourseModule } from './progress-course/progress-course.module';
import { ProgressLessonModule } from './progress-lesson/progress-lesson.module';
import { SeederModule } from './seeder/seeder.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import { Course } from './course/entities/course.entity';
import { Lesson } from './lesson/entities/lesson.entity';
import { ProgressCourse } from './progress-course/entities/progress-course.entity';
import { ProgressLesson } from './progress-lesson/entities/progress-lesson.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    CommonModule,
    AuthModule,
    CourseModule,
    LessonModule,
    ProgressCourseModule,
    ProgressLessonModule,
    SeederModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      models: [User, Course, Lesson, ProgressCourse, ProgressLesson],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
