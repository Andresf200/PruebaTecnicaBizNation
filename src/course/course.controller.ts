import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from 'src/lesson/dto/create-lesson.dto';
import { PaginationAndFilterDto } from 'src/common/dtos/pagination-filter.dtos';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
//Todo  solo admin puede hacer esto

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.admin)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Patch('/add/lesson/:id')
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.admin)
  addLesson(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createLessonDto: CreateLessonDto[],
  ) {
    return this.courseService.addLessonsToCourse(id, createLessonDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.admin)
  findAll(
    @GetUser() user: User,
    @Query() paginationDTO: PaginationAndFilterDto,
  ) {
    return this.courseService.findAll(paginationDTO, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.admin)
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.courseService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseService.remove(id);
  }
}
