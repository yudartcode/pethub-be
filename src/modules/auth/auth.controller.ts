// auth/auth.controller.ts
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { resBuilder } from 'src/core/utils/utils';
import { AuthRespose } from './entities/auth.entity';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthRespose })
  async login(@Body() payload: AuthDto) {
    const user = await this.authService.validateUser(
      payload.email,
      payload.password,
    );
    const result = await this.authService.login(user);
    return resBuilder(HttpStatus.OK, true, 'Login success', result);
  }
}
