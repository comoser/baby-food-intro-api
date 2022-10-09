import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateParentProfileRequestDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
