// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/core/utils/utils';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthRespose } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await comparePassword(pass, user.password))) {
      return user;
    }
    throw new UnauthorizedException('invalid email/password');
  }

  async login(user: User): Promise<AuthRespose> {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    };
  }
}
