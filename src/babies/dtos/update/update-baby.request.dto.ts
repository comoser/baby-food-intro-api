import { IsString, IsDateString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateBabyRequestDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;
}
