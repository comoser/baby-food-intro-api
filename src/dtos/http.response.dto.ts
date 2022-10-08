import { HttpStatus } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

type HttpResponseDtoOptions<
  T extends Record<string, unknown> | Record<string, unknown>[],
> = {
  data?: T;
  message?: string[];
  error?: any;
};

export class HttpResponseDto {
  @IsNumber()
  @IsNotEmpty()
  statusCode!: HttpStatus;

  @IsOptional()
  data?: any;

  @IsOptional()
  message?: string[];

  @IsOptional()
  error?: string;

  static createHttpResponseDto<
    T extends Record<string, unknown> | Record<string, unknown>[],
  >(
    statusCode: HttpStatus,
    options?: HttpResponseDtoOptions<T>,
  ): HttpResponseDto {
    let response: HttpResponseDto = { statusCode };

    if (options?.data) response = { ...response, data: options.data };
    if (options?.message) response = { ...response, message: options.message };
    if (options?.error) response = { ...response, error: options.error };

    return response;
  }
}
