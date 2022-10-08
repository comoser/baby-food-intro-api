import { CreateBabyResponseDto } from '../../babies/dtos/create/create-baby.response.dto';
import { FoodIntroductionResult } from '../food-introduction.entity';

export type FoodIntroductionResponseDto = {
  id: string;
  foodName: string;
  date: string;
  preparation?: string;
  presentation?: string;
  result?: FoodIntroductionResult;
  baby: CreateBabyResponseDto | string;
};
