import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { LessonModule } from 'src/lesson/lesson.module';
import { Course } from './entities/course.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { ProgressLesson } from 'src/progress-lesson/entities/progress-lesson.entity';
import { ProgressCourse } from 'src/progress-course/entities/progress-course.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  controllers: [CourseController],
  imports: [
    AuthModule,
    LessonModule,
    SequelizeModule.forFeature([Course]),
    SequelizeModule.forFeature([Lesson]),
    SequelizeModule.forFeature([ProgressLesson]),
    SequelizeModule.forFeature([ProgressCourse]),
    SequelizeModule.forFeature([User]),
  ],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
