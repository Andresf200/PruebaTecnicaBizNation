import { Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';
import { AuthService } from '../auth/auth.service';
import { ProgressCourseService } from 'src/progress-course/progress-course.service';
import { ProgressLessonService } from 'src/progress-lesson/progress-lesson.service';
import {
  CourseData,
  courseData,
  UserData,
  userDataAdmin,
  userDataStudent,
} from './data/seed-data';
import { User } from 'src/user/entities/user.entity';
import { Course } from 'src/course/entities/course.entity';
export enum State {
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
}
@Injectable()
export class SeederService {
  constructor(
    private readonly courseService: CourseService,
    private readonly authService: AuthService,
    private readonly progressCourseService: ProgressCourseService,
    private readonly progressLessonService: ProgressLessonService,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const { students } = await this.insertUsers();
    const courses = await this.insertCoursesLessons();
    await this.insertProgressCourse(courses, students);
    await this.insertProgressLesson(courses, students);
    return 'Seed completed';
  }

  private async insertProgressLesson(courses: Course[], students: User[]) {
    courses.map((course) => {
      course.lessons.map(async (lesson) => {
        const student = students[Math.floor(Math.random() * students.length)];
        await this.progressLessonService.create(
          {
            lessonId: lesson.id,
            state:
              Object.values(State)[
                Math.floor(Math.random() * Object.values(State).length)
              ],
          },
          student,
        );
      });
    });
  }

  private async insertProgressCourse(courses: Course[], students: User[]) {
    try {
      for (const course of courses) {
        const student = students[Math.floor(Math.random() * students.length)];
        await this.progressCourseService.create(
          {
            courseId: course.id,
            state:
              Object.values(State)[
                Math.floor(Math.random() * Object.values(State).length)
              ],
          },
          student,
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  private async insertCoursesLessons() {
    const seedCoursesLessons = await courseData;
    const courses: Course[] = await Promise.all(
      seedCoursesLessons.map(async (course: CourseData) => {
        return this.courseService.create(course);
      }),
    );

    return courses;
  }

  private async insertUsers() {
    const seedAdmins = await userDataAdmin;
    const admins: User[] = [];
    seedAdmins.forEach(async (admin: UserData) => {
      admins.push(await this.authService.register(admin));
    });

    const seedStudents = await userDataStudent;
    const students: User[] = [];
    seedStudents.forEach(async (student: UserData) => {
      students.push(await this.authService.register(student));
    });

    return { admins, students };
  }

  private async deleteTables() {
    await this.progressLessonService.deleteAllProgressLessons();
    await this.progressCourseService.deleteAllProgressCourse();
    await this.authService.deleteAllUsers();
    await this.courseService.deleteAllCourseLesons();
  }
}
