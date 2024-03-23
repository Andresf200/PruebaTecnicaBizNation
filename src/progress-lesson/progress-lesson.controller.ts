import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressLessonService } from './progress-lesson.service';
import { CreateProgressLessonDto } from './dto/create-progress-lesson.dto';
import { UpdateProgressLessonDto } from './dto/update-progress-lesson.dto';

@Controller('progress-lesson')
export class ProgressLessonController {
  constructor(private readonly progressLessonService: ProgressLessonService) {}

  @Post()
  create(@Body() createProgressLessonDto: CreateProgressLessonDto) {
    return this.progressLessonService.create(createProgressLessonDto);
  }

  @Get()
  findAll() {
    return this.progressLessonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressLessonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressLessonDto: UpdateProgressLessonDto) {
    return this.progressLessonService.update(+id, updateProgressLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressLessonService.remove(+id);
  }
}
