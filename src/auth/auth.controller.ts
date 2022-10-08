import { AuthService } from './auth.service';
import { Body, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.gard';

import { Controller } from '@nestjs/common';
import { RegisterUserRequestDto } from './dtos/register-user.request.dto';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Request() request) {
    return this.authService.loginUser(request.user);
  }

  @Public()
  @Post('/register')
  async registerUser(@Body() registerUserRequestDto: RegisterUserRequestDto) {
    return this.authService.registerUser(registerUserRequestDto);
  }
}
