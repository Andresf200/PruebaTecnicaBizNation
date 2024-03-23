import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { Lesson } from './entities/lesson.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [LessonController],
  imports: [SequelizeModule.forFeature([Lesson])],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
