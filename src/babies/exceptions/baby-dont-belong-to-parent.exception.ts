import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpResponseDto } from '../../dtos/http.response.dto';

export class BabyDontBelongToParentException extends HttpException {
  constructor() {
    const response = HttpResponseDto.createHttpResponseDto(
      HttpStatus.FORBIDDEN,
      {
        error: 'The requested baby is a child of the authenticated parent',
      },
    );
    super(response, response.statusCode);
  }
}
