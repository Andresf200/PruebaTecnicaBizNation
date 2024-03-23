import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  controllers: [SeederController],
  imports: [AuthModule, CourseModule],
  providers: [SeederService],
})
export class SeederModule {}
