import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProgressCourseService } from './progress-course.service';
import { CreateProgressCourseDto } from './dto/create-progress-course.dto';
import { UpdateProgressCourseDto } from './dto/update-progress-course.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
//Todo solo para estudiante
@Controller('progress-course')
export class ProgressCourseController {
  constructor(private readonly progressCourseService: ProgressCourseService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createProgressCourseDto: CreateProgressCourseDto,
    @GetUser() user: User,
  ) {
    return this.progressCourseService.create(createProgressCourseDto, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateProgressCourseDto: UpdateProgressCourseDto,
  ) {
    return this.progressCourseService.update(+id, updateProgressCourseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.progressCourseService.remove(+id);
  }
}
