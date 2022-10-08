import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpResponseDto } from '../../dtos/http.response.dto';

export class ShareBabyInvitationNotFoundException extends HttpException {
  constructor() {
    const response = HttpResponseDto.createHttpResponseDto(
      HttpStatus.NOT_FOUND,
      {
        error: 'The requested invitation was not found',
      },
    );
    super(response, response.statusCode);
  }
}
