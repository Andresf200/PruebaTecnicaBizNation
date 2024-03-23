import { Injectable } from '@nestjs/common';
import { CreateProgressLessonDto } from './dto/create-progress-lesson.dto';
import { UpdateProgressLessonDto } from './dto/update-progress-lesson.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ProgressLesson } from 'src/progress-lesson/entities/progress-lesson.entity';
import { Lesson } from 'src/lesson/entities/lesson.entity';

@Injectable()
export class ProgressLessonService {
  constructor(
    @InjectModel(ProgressLesson)
    private readonly progressLessonModel: typeof ProgressLesson,

    @InjectModel(Lesson)
    private readonly lessonModel: typeof Lesson,
  ) {}

  async create(createProgressLessonDto: CreateProgressLessonDto, user: User) {
    const { state, lessonId } = createProgressLessonDto;

    const lesson = await this.lessonModel.findByPk(lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    const progressLesson = await this.progressLessonModel.create({
      userId: user.id,
      lessonId: lesson.id,
      state: state,
      date_completed: state === 'completed' ? new Date() : null,
    });

    return progressLesson;
  }

  async update(id: number, updateProgressLessonDto: UpdateProgressLessonDto) {
    const { state } = updateProgressLessonDto;

    const progressLesson = await this.progressLessonModel.findOne({
      where: { id },
    });
    if (!progressLesson) {
      throw new Error('ProgressLesson not found');
    }

    await progressLesson.update({
      state,
      date_completed: state === 'completed' ? new Date() : null,
    });

    return progressLesson.reload();
  }

  async remove(id: number) {
    const progressCourse = await this.progressLessonModel.findByPk(id);
    if (!progressCourse) {
      throw new Error('ProgressLesson not found');
    }
    return progressCourse.destroy();
  }
}
