// auth/auth.controller.ts
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { resBuilder } from 'src/core/utils/utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req: AuthDto) {
    const user = await this.authService.validateUser(
      req.username,
      req.password,
    );
    const result = await this.authService.login(user);
    return resBuilder(HttpStatus.OK, true, 'Login success', result);
  }
}
