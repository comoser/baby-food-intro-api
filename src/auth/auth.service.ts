import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserRequestDto } from './dtos/register-user.request.dto';
import { HttpResponseDto } from '../dtos/http.response.dto';
import { LoginUserResponseDto } from './dtos/login-user.response.dto';
import { ParentIntegrationService } from '../parents/integrations/parent-integration.service';
import { passwordMatches } from '../security/hash';
import { AuthUser } from '../types/auth-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly parentAuthIntegrationService: ParentIntegrationService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(user: AuthUser) {
    const payload = { username: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return HttpResponseDto.createHttpResponseDto<LoginUserResponseDto>(
      HttpStatus.OK,
      {
        data: {
          accessToken,
        },
      },
    );
  }

  async registerUser(registerUserRequestDto: RegisterUserRequestDto) {
    const parentEntity = await ParentIntegrationService.createParentEntity(
      registerUserRequestDto,
    );
    await this.parentAuthIntegrationService.saveParent(parentEntity);

    return HttpResponseDto.createHttpResponseDto(HttpStatus.NO_CONTENT);
  }

  async validateUser(email: string, password: string): Promise<AuthUser> {
    const parent = await this.parentAuthIntegrationService.findParentBy(email);

    if (parent && (await passwordMatches(password, parent.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = parent;
      return result;
    }

    return null;
  }
}
