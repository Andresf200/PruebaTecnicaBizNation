import { PartialType } from '@nestjs/mapped-types';
import { CreateProgressCourseDto } from './create-progress-course.dto';

export class UpdateProgressCourseDto extends PartialType(CreateProgressCourseDto) {}
