import * as bcrypt from 'bcrypt';

export interface CourseData {
  logo: string;
  title: string;
  description: string;
  date_published: Date;
  introduction_video: string;
  lessons: Lesson[];
}

export interface Lesson {
  title: string;
  description: string;
  link_video: string;
}

export interface UserData {
  full_name: string;
  date_birth: Date;
  email: string;
  role: string;
  password: string;
}

export interface ProgressCourseData {
  state: string;
  courseId: string;
}

export interface ProgressLessonData {
  state: string;
  Lesson: string;
}

const courseData: CourseData[] = [
  {
    logo: 'logo1.png',
    title: 'Course 1',
    description: 'This is course 1',
    date_published: new Date('2024-05-12'),
    introduction_video: 'intro1.mp4',
    lessons: [
      {
        title: 'Lesson 1',
        description: 'This is lesson 1',
        link_video: 'lesson1.mp4',
      },
      {
        title: 'Lesson 2',
        description: 'This is lesson 2',
        link_video: 'lesson2.mp4',
      },
    ],
  },
  {
    logo: 'logo2.png',
    title: 'Course 2',
    description: 'This is course 2',
    date_published: new Date('2024-05-12'),
    introduction_video: 'intro2.mp4',
    lessons: [
      {
        title: 'Lesson 1',
        description: 'This is lesson 1',
        link_video: 'lesson1.mp4',
      },
      {
        title: 'Lesson 2',
        description: 'This is lesson 2',
        link_video: 'lesson2.mp4',
      },
    ],
  },
  // Add more courses as needed
];

const userDataAdmin: UserData[] = [
  {
    full_name: 'User 1',
    date_birth: new Date('1990-01-01'),
    email: 'admin@example.com',
    role: 'admin',
    password: bcrypt.hashSync('Abc123456', 10),
  },
  // Add more users as needed
];

const userDataStudent: UserData[] = [
  {
    full_name: 'User 1',
    date_birth: new Date('1990-01-01'),
    email: 'user1@example.com',
    role: 'student',
    password: bcrypt.hashSync('Abc123456', 10),
  },
];

const progressCourseData: ProgressCourseData[] = [
  {
    state: 'in progress',
    courseId: '1',
  },
  // Add more progressCourseData as needed
];

const progressLessonData: ProgressLessonData[] = [
  {
    state: 'completed',
    Lesson: '1',
  },
  // Add more progressLessonData as needed
];

export {
  courseData,
  userDataStudent,
  userDataAdmin,
  progressCourseData,
  progressLessonData,
};
