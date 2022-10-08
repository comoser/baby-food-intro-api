import { FoodIntroductionEntity } from '../food-introduction.entity';
import { babyResponseDtoFactory } from '../../babies/factories/baby-response-dto.factory';
import { FoodIntroductionResponseDto } from '../dtos/food-introduction.response.dto';

export function foodIntroductionResponseDtoFactory(
  foodIntroductionEntity: FoodIntroductionEntity,
  keepRelations = false,
) {
  function getBaby() {
    if (keepRelations) {
      return babyResponseDtoFactory(foodIntroductionEntity.baby, true);
    }
    return foodIntroductionEntity.baby.id;
  }

  const foodIntroductionResponseDto: FoodIntroductionResponseDto = {
    id: foodIntroductionEntity.id,
    foodName: foodIntroductionEntity.foodName,
    date: foodIntroductionEntity.date,
    ...(foodIntroductionEntity.preparation
      ? { preparation: foodIntroductionEntity.preparation }
      : {}),
    ...(foodIntroductionEntity.presentation
      ? { presentation: foodIntroductionEntity.presentation }
      : {}),
    ...(foodIntroductionEntity.result
      ? { result: foodIntroductionEntity.result }
      : {}),
    baby: getBaby(),
  };

  return foodIntroductionResponseDto;
}
