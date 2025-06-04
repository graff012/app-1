import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authDto: CreateAuthDto) {
    return await this.authService.register(authDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    console.log(loginDto);
    return await this.authService.login(loginDto);
  }
}
