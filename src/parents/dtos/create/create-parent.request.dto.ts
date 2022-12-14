import { IsString, IsEmail, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateParentRequestDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsDateString()
  @IsNotEmpty()
  dateOfBirth!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
