import { Module } from '@nestjs/common';
import { ProgressCourseService } from './progress-course.service';
import { ProgressCourseController } from './progress-course.controller';
import { ProgressCourse } from './entities/progress-course.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Course } from 'src/course/entities/course.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [ProgressCourseController],
  imports: [
    SequelizeModule.forFeature([ProgressCourse]),
    SequelizeModule.forFeature([Course]),
    AuthModule,
    PassportModule,
  ],
  providers: [ProgressCourseService],
  exports: [ProgressCourseService],
})
export class ProgressCourseModule {}
