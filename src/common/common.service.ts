import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
@Injectable()
export class CommonService {
  handleExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(
        'Error de solicitud: algunos datos estan duplicados ' + error.detail,
      );
    //   this.logger.error(error);
    console.log(error);
    throw new InternalServerErrorException(
      'Error inesperado, revisa los registros del servidor',
    );
  }
}
