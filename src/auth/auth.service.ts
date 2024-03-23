import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './strategies/interface/jwt-payload.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    private readonly jwtService: JwtService,

    private readonly commonService: CommonService,
  ) {}

  async login(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userData = user.get({ plain: true });
    return {
      ...userData,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = await this.userModel.create({
        ...userData,
        password: await bcrypt.hashSync(password, 10),
      });
      return user;
    } catch (e) {
      this.commonService.handleExceptions(e);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
