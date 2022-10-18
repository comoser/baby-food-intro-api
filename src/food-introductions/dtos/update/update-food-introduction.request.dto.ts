import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUUID,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { FoodIntroductionResult } from '../../food-introduction.entity';

export class UpdateFoodIntroductionRequestDto {
  @IsString()
  @IsOptional()
  foodName?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  preparation?: string;

  @IsString()
  @IsOptional()
  presentation?: string;

  @IsEnum(FoodIntroductionResult)
  @IsOptional()
  result?: FoodIntroductionResult;
}
