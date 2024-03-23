import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { Lesson } from './entities/lesson.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LessonController],
  imports: [SequelizeModule.forFeature([Lesson]), AuthModule],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
