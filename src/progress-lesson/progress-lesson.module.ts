import { Module } from '@nestjs/common';
import { ProgressLessonService } from './progress-lesson.service';
import { ProgressLessonController } from './progress-lesson.controller';
import { ProgressLesson } from './entities/progress-lesson.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProgressLesson]),
    SequelizeModule.forFeature([Lesson]),
    AuthModule,
  ],
  controllers: [ProgressLessonController],
  providers: [ProgressLessonService],
})
export class ProgressLessonModule {}
