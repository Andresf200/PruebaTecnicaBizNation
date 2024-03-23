import { Injectable } from '@nestjs/common';
import { CourseService } from 'src/course/course.service';

@Injectable()
export class SeederService {
  constructor(private courseservice: CourseService) {}

  async runSeed() {
    await this.deleteTables();
  }

  private async deleteTables() {
    // await this.courseservice.deleteAllProducts();
    // const queryBuilder = this.userRepository.createQueryBuilder();
    // await queryBuilder.delete().where({}).execute();
  }
}
