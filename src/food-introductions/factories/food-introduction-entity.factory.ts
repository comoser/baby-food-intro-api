import { FoodIntroductionEntity } from '../food-introduction.entity';
import { BabyEntity } from '../../babies/baby.entity';
import { CreateFoodIntroductionRequestDto } from '../dtos/create/create-food-introduction.request.dto';

export function foodIntroductionEntityFactory(
  babyEntity: BabyEntity,
  foodIntroductionDto: CreateFoodIntroductionRequestDto,
) {
  const foodIntroductionEntity = new FoodIntroductionEntity();

  foodIntroductionEntity.foodName = foodIntroductionDto.foodName;
  foodIntroductionEntity.date = foodIntroductionDto.date;
  foodIntroductionEntity.preparation = foodIntroductionDto.preparation ?? null;
  foodIntroductionEntity.presentation =
    foodIntroductionDto.presentation ?? null;
  foodIntroductionEntity.result = foodIntroductionDto.result ?? null;
  foodIntroductionEntity.baby = babyEntity;

  return foodIntroductionEntity;
}
