import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpResponseDto } from '../../dtos/http.response.dto';

export class BabyNotFoundException extends HttpException {
  constructor() {
    const response = HttpResponseDto.createHttpResponseDto(
      HttpStatus.NOT_FOUND,
      {
        error: 'The requested baby was not found',
      },
    );
    super(response, response.statusCode);
  }
}
