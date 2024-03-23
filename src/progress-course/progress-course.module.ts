import { Module } from '@nestjs/common';
import { ProgressCourseService } from './progress-course.service';
import { ProgressCourseController } from './progress-course.controller';
import { ProgressCourse } from './entities/progress-course.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Course } from 'src/course/entities/course.entity';

@Module({
  controllers: [ProgressCourseController],
  imports: [
    SequelizeModule.forFeature([ProgressCourse]),
    SequelizeModule.forFeature([Course]),
    AuthModule,
  ],
  providers: [ProgressCourseService],
})
export class ProgressCourseModule {}
