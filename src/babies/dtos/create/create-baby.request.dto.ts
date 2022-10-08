import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBabyRequestDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth!: string;
}
