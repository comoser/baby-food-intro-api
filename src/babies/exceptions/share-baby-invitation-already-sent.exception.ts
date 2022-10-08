import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpResponseDto } from '../../dtos/http.response.dto';

export class ShareBabyInvitationAlreadySentException extends HttpException {
  constructor() {
    const response = HttpResponseDto.createHttpResponseDto(
      HttpStatus.BAD_REQUEST,
      {
        error:
          'An invitation with the specified email for the specified baby already exists',
      },
    );
    super(response, response.statusCode);
  }
}
