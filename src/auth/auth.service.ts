import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserRequestDto } from './dtos/register-user.request.dto';
import { HttpResponseDto } from '../dtos/http.response.dto';
import { LoginUserResponseDto } from './dtos/login-user.response.dto';
import { ParentIntegrationService } from '../parents/integrations/parent-integration.service';
import { passwordMatches } from '../security/hash';
import { AuthUser } from '../types/auth-user';
import { createParentEntityFactory } from '../parents/factories/create-parent-entity.factory';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly parentAuthIntegrationService: ParentIntegrationService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(user: AuthUser) {
    const payload = { username: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    this.logger.log(`Received request to login ${payload.username}`);
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
    this.logger.log(
      `Received request to register user ${registerUserRequestDto.email}`,
    );
    const parentEntity = await createParentEntityFactory(
      registerUserRequestDto,
    );
    await this.parentAuthIntegrationService.saveParent(parentEntity);

    return HttpResponseDto.createHttpResponseDto(HttpStatus.NO_CONTENT);
  }

  async validateUser(email: string, password: string): Promise<AuthUser> {
    this.logger.log(`Validating user ${email}`);
    const parent = await this.parentAuthIntegrationService.findParentBy(email);

    if (parent && (await passwordMatches(password, parent.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = parent;
      return result;
    }

    return null;
  }
}
