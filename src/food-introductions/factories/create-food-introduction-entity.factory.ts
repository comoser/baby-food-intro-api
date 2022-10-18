import { BabyEntity } from '../../babies/baby.entity';
import { CreateFoodIntroductionRequestDto } from '../dtos/create/create-food-introduction.request.dto';
import { FoodIntroductionEntityBuilder } from '../food-introduction.entity.builder';

export function createFoodIntroductionEntityFactory(
  babyEntity: BabyEntity,
  createFoodIntroductionRequestDto: CreateFoodIntroductionRequestDto,
) {
  return new FoodIntroductionEntityBuilder()
    .withFoodName(createFoodIntroductionRequestDto.foodName)
    .withDate(createFoodIntroductionRequestDto.date)
    .withPreparation(createFoodIntroductionRequestDto.preparation ?? null)
    .withPresentation(createFoodIntroductionRequestDto.presentation ?? null)
    .withResult(createFoodIntroductionRequestDto.result ?? null)
    .withBaby(babyEntity)
    .build();
}
