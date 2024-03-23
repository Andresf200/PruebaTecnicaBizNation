import { PartialType } from '@nestjs/mapped-types';
import { CreateProgressLessonDto } from './create-progress-lesson.dto';

export class UpdateProgressLessonDto extends PartialType(CreateProgressLessonDto) {}
