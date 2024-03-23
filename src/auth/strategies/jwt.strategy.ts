import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interface/jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,

    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { id } = payload;

    const user = await this.userModel.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException('Token no valid');
    }

    return user;
  }
}
