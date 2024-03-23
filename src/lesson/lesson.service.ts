import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Lesson } from './entities/lesson.entity';
import { ProgressLesson } from 'src/progress-lesson/entities/progress-lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson)
    private lessonModel: typeof Lesson,
  ) {}

  create(createLessonDto: CreateLessonDto) {
    try {
      const lesson = this.lessonModel.create({ ...createLessonDto });
      return lesson;
    } catch (e) {
      this.handleExceptions(e);
    }
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    try {
      const lesson = await this.lessonModel.findByPk(id);

      if (!lesson) {
        throw new Error('Lesson not found');
      }

      await lesson.update({ ...updateLessonDto });

      return lesson;
    } catch (e) {
      this.handleExceptions(e);
    }
  }

  async remove(id: string) {
    const lesson = await this.lessonModel.findOne({
      where: { id },
      include: [ProgressLesson],
    });

    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }

    const lessonsInCourse = this.countProgressLessons(lesson);

    if (lessonsInCourse.length > 0) {
      throw new BadRequestException('Lesson has progress, cannot be deleted');
    }

    await lesson.destroy();
  }

  countProgressLessons(lesson: any) {
    return lesson.progressLessons.filter((progress) => {
      return progress.state !== 'pending';
    });
  }

  private handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(
        'Error de solicitud: algunos datos estan duplicados ' + error.detail,
      );
    //   this.logger.error(error);
    console.log(error);
    throw new InternalServerErrorException(
      'Error inesperado, revisa los registros del servidor',
    );
  }
}
