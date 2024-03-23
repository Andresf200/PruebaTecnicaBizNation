import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProgressLessonService } from './progress-lesson.service';
import { CreateProgressLessonDto } from './dto/create-progress-lesson.dto';
import { UpdateProgressLessonDto } from './dto/update-progress-lesson.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';

@Controller('progress-lesson')
export class ProgressLessonController {
  constructor(private readonly progressLessonService: ProgressLessonService) {}

  @Post()
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.student)
  create(
    @Body() createProgressLessonDto: CreateProgressLessonDto,
    @GetUser() user: User,
  ) {
    return this.progressLessonService.create(createProgressLessonDto, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.student)
  update(
    @Param('id') id: string,
    @Body() updateProgressLessonDto: UpdateProgressLessonDto,
  ) {
    return this.progressLessonService.update(+id, updateProgressLessonDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @RoleProtected(ValidRoles.student)
  remove(@Param('id') id: string) {
    return this.progressLessonService.remove(+id);
  }
}
