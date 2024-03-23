import { Injectable } from '@nestjs/common';
import { CreateProgressCourseDto } from './dto/create-progress-course.dto';
import { UpdateProgressCourseDto } from './dto/update-progress-course.dto';

@Injectable()
export class ProgressCourseService {
  create(createProgressCourseDto: CreateProgressCourseDto) {
    return 'This action adds a new progressCourse';
  }

  findAll() {
    return `This action returns all progressCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} progressCourse`;
  }

  update(id: number, updateProgressCourseDto: UpdateProgressCourseDto) {
    return `This action updates a #${id} progressCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} progressCourse`;
  }
}
