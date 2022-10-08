import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUUID,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { FoodIntroductionResult } from '../../food-introduction.entity';

export class CreateFoodIntroductionRequestDto {
  @IsString()
  @IsNotEmpty()
  foodName!: string;

  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsOptional()
  preparation?: string;

  @IsString()
  @IsOptional()
  presentation?: string;

  @IsEnum(FoodIntroductionResult)
  @IsOptional()
  result?: FoodIntroductionResult;

  @IsUUID()
  @IsNotEmpty()
  babyId!: string;
}
