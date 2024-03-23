import { Injectable } from '@nestjs/common';
import { CreateProgressCourseDto } from './dto/create-progress-course.dto';
import { UpdateProgressCourseDto } from './dto/update-progress-course.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ProgressCourse } from './entities/progress-course.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class ProgressCourseService {
  constructor(
    @InjectModel(ProgressCourse)
    private readonly progressCourseModel: typeof ProgressCourse,

    @InjectModel(Course)
    private readonly courseModel: typeof Course,
  ) {}

  async create(createProgressCourseDto: CreateProgressCourseDto, user: User) {
    const { state, courseId } = createProgressCourseDto;

    const course = await this.courseModel.findByPk(courseId);
    if (!course) {
      throw new Error('Course not found');
    }

    const progressCourse = await this.progressCourseModel.create({
      userId: user.id,
      courseId: course.id,
      state: state,
      date_completed: state === 'completed' ? new Date() : null,
    });

    return progressCourse;
  }

  async update(id: number, updateProgressCourseDto: UpdateProgressCourseDto) {
    const { state } = updateProgressCourseDto;

    const progressCourse = await this.progressCourseModel.findOne({
      where: { id },
    });
    if (!progressCourse) {
      throw new Error('ProgressCourse not found');
    }

    await progressCourse.update({
      state,
      date_completed: state === 'completed' ? new Date() : null,
    });

    return progressCourse.reload();
  }

  async remove(id: number) {
    const progressCourse = await this.progressCourseModel.findByPk(id);
    if (!progressCourse) {
      throw new Error('ProgressCourse not found');
    }
    return progressCourse.destroy();
  }

  async deleteAllProgressCourse() {
    await this.progressCourseModel.destroy({ where: {}, force: true });
  }
}
