import { Module } from '@nestjs/common';
import { ProgressCourseService } from './progress-course.service';
import { ProgressCourseController } from './progress-course.controller';

@Module({
  controllers: [ProgressCourseController],
  providers: [ProgressCourseService],
})
export class ProgressCourseModule {}
