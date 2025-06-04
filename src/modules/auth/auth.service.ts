import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/core/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}
  async register(authData: CreateAuthDto) {
    const findUser = await this.prisma.user.findUnique({
      where: { username: authData.username },
    });

    if (findUser) throw new ConflictException('Username already exists');

    const hashedPass = await bcrypt.hash(authData.password, 12);

    const newUser = await this.prisma.user.create({
      data: {
        ...authData,
        password: hashedPass,
      },
    });

    const token = await this.jwtService.signAsync({ userId: newUser.id });

    return token;
  }

  async login(loginData: LoginAuthDto) {
    const findUser = await this.prisma.user.findUnique({
      where: { username: loginData.username },
    });

    if (!findUser) throw new NotFoundException('Username not found');

    const comparePass = await bcrypt.compare(
      loginData.password,
      findUser.password
    );

    if (!comparePass) throw new NotFoundException('password is incorrect');

    const token = await this.jwtService.signAsync({ userId: findUser.id });

    return token;
  }
}
