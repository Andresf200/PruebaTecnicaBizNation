import { Module } from '@nestjs/common';
import { ProgressLessonService } from './progress-lesson.service';
import { ProgressLessonController } from './progress-lesson.controller';

@Module({
  controllers: [ProgressLessonController],
  providers: [ProgressLessonService],
})
export class ProgressLessonModule {}
