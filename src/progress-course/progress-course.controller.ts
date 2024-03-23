import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressCourseService } from './progress-course.service';
import { CreateProgressCourseDto } from './dto/create-progress-course.dto';
import { UpdateProgressCourseDto } from './dto/update-progress-course.dto';

@Controller('progress-course')
export class ProgressCourseController {
  constructor(private readonly progressCourseService: ProgressCourseService) {}

  @Post()
  create(@Body() createProgressCourseDto: CreateProgressCourseDto) {
    return this.progressCourseService.create(createProgressCourseDto);
  }

  @Get()
  findAll() {
    return this.progressCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressCourseDto: UpdateProgressCourseDto) {
    return this.progressCourseService.update(+id, updateProgressCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressCourseService.remove(+id);
  }
}
