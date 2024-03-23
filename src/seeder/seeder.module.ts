import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CourseModule } from 'src/course/course.module';
import { ProgressCourseModule } from 'src/progress-course/progress-course.module';
import { ProgressLessonModule } from 'src/progress-lesson/progress-lesson.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [SeederController],
  imports: [
    AuthModule,
    PassportModule,
    CourseModule,
    ProgressCourseModule,
    ProgressLessonModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
