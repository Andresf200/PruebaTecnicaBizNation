import { Injectable } from '@nestjs/common';
import { CreateProgressLessonDto } from './dto/create-progress-lesson.dto';
import { UpdateProgressLessonDto } from './dto/update-progress-lesson.dto';

@Injectable()
export class ProgressLessonService {
  create(createProgressLessonDto: CreateProgressLessonDto) {
    return 'This action adds a new progressLesson';
  }

  findAll() {
    return `This action returns all progressLesson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} progressLesson`;
  }

  update(id: number, updateProgressLessonDto: UpdateProgressLessonDto) {
    return `This action updates a #${id} progressLesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} progressLesson`;
  }
}
