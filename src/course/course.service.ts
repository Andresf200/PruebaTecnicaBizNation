import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './entities/course.entity';
import { LessonService } from '../lesson/lesson.service';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';
import { PaginationAndFilterDto } from 'src/common/dtos/pagination-filter.dtos';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { ProgressLesson } from 'src/progress-lesson/entities/progress-lesson.entity';
import { User } from 'src/user/entities/user.entity';
import { Op } from 'sequelize';
import { ProgressCourse } from 'src/progress-course/entities/progress-course.entity';
import { CommonService } from '../common/common.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private readonly courseModel: typeof Course,

    @InjectModel(Lesson)
    private readonly lessonModel: typeof Lesson,

    @InjectModel(ProgressCourse)
    private readonly progressCourseModel: typeof ProgressCourse,

    @InjectModel(ProgressLesson)
    private readonly progressLessonModel: typeof ProgressLesson,

    @InjectModel(User)
    private readonly userModel: typeof User,

    private readonly lessonService: LessonService,

    private readonly commonService: CommonService,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseModel.create({
        logo: createCourseDto.logo,
        title: createCourseDto.title,
        description: createCourseDto.description,
        date_published: createCourseDto.date_published,
        introduction_video: createCourseDto.introduction_video,
      });

      for (const lessonDto of createCourseDto.lessons) {
        const lessonData = { ...lessonDto, courseId: course.id };
        const lesson = await this.lessonService.create(lessonData);
        await course.$add('lesson', lesson);
      }

      await course.reload({ include: ['lessons'] });
      return course;
    } catch (e) {
      this.commonService.handleExceptions(e);
    }
  }

  async findAll(paginationDto: PaginationAndFilterDto, user: User) {
    const {
      limit = 10,
      page = 1,
      title = '',
      startDate = '',
      endDate = '',
      progress = '',
    } = paginationDto;

    const whereClause = {};
    if (title) {
      whereClause['title'] = title;
    }
    if (startDate && endDate) {
      whereClause['date_published'] = {
        [Op.between]: [startDate, endDate],
      };
    } else if (startDate) {
      whereClause['date_published'] = {
        [Op.gte]: startDate,
      };
    } else if (endDate) {
      whereClause['date_published'] = {
        [Op.lte]: endDate,
      };
    }
    if (progress) {
      whereClause['progress'] = progress;
    }

    const courses = await this.courseModel.findAll({
      include: [
        {
          model: Lesson,
          as: 'lessons',
          include: [
            {
              model: ProgressLesson,
              as: 'progressLessons',
              where: { userId: user.id },
              required: false,
            },
          ],
        },
        {
          model: this.progressCourseModel,
          as: 'progressCourses',
          where: { userId: user.id },
          required: false,
        },
      ],
      where: whereClause,
      limit: limit,
      offset: (page - 1) * limit,
    });

    return courses.map((course) => {
      const courseResponse: { [key: string]: any } = {
        logo: course.logo,
        title: course.title,
        date_published: course.date_published,
        introduction_video: course.introduction_video,
        lessons_count: course.lessons.length,
        finished_lessons_count: course.lessons
          ? course.lessons.reduce(
              (sum, lesson) => {
                const completedProgressLessons = lesson.progressLessons.filter(
                  (progressLesson) => progressLesson.state === 'completed',
                ).length;
                return sum + completedProgressLessons;
              },
              0, // Valor inicial para la suma
            )
          : 0,
      };

      if (user.role === 'student') {
        courseResponse.progressUser = course.progressCourses
          ? course.progressCourses.state
          : null;
      }

      return courseResponse;
    });
  }

  async findOne(id: string, user: User) {
    const course = await (
      user.role === 'admin' ? this.courseModel.unscoped() : this.courseModel
    ).findByPk(id, {
      include: [
        {
          model:
            user.role === 'admin'
              ? this.lessonModel.unscoped()
              : this.lessonModel,
          required: false,
          include: [
            user.role === 'student'
              ? {
                  model: this.progressLessonModel,
                  where: { userId: user.id },
                  required: false,
                  attributes: ['state'],
                }
              : null,
          ],
        },
        user.role === 'student'
          ? {
              model: this.progressCourseModel,
              where: { userId: user.id },
              required: false,
              attributes: ['state'],
            }
          : null,
      ],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    if (user.role === 'student' && course.deletedAt) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async update(courseId: string, updateCourseDto: UpdateCourseDto) {
    //Debe ser posible agregar más lecciones a un curso que ya está creado
    try {
      const course = await this.courseModel.findByPk(courseId);

      if (!course) {
        throw new Error('Course not found');
      }

      await course.update({
        logo: updateCourseDto.logo,
        title: updateCourseDto.title,
        description: updateCourseDto.description,
        date_published: updateCourseDto.date_published,
        introduction_video: updateCourseDto.introduction_video,
      });

      for (const lessonDto of updateCourseDto.lessons) {
        const lessonData = { ...lessonDto, courseId: course.id };
        const lesson = await this.lessonService.update(
          lessonDto.id,
          lessonData,
        );
        await course.$add('lesson', lesson);
      }

      await course.reload({ include: ['lessons'] });
      return course;
    } catch (e) {
      this.commonService.handleExceptions(e);
    }
  }

  async addLessonsToCourse(
    courseId: string,
    createLessonDtos: CreateLessonDto[],
  ) {
    const course = await this.courseModel.findByPk(courseId);

    if (!course) {
      throw new Error('Course not found');
    }

    for (const lessonDto of createLessonDtos['lessons']) {
      const lessonData = { ...lessonDto, courseId: course.id };
      const lesson = await this.lessonService.create(lessonData);
      await course.$add('lesson', lesson);
    }

    await course.reload({ include: ['lessons'] });
    return course;
  }

  async remove(id: string) {
    const course = await this.courseModel.findOne({
      where: { id },
      include: [ProgressCourse],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    if (course.progressCourses.state !== 'pending') {
      throw new BadRequestException(
        'A course that has already been started cannot be deleted',
      );
    }
    await course.destroy();
  }

  async deleteAllCourseLesons() {
    await this.lessonModel.destroy({ where: {}, force: true });
    await this.courseModel.destroy({ where: {}, force: true });
  }
}
