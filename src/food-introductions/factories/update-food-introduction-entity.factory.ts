import { FoodIntroductionEntityBuilder } from '../food-introduction.entity.builder';
import { FoodIntroductionEntity } from '../food-introduction.entity';
import { UpdateFoodIntroductionRequestDto } from '../dtos/update/update-food-introduction.request.dto';

export function updateFoodIntroductionEntityFactory(
  foodIntroductionEntity: FoodIntroductionEntity,
  updateFoodIntroductionRequestDto: UpdateFoodIntroductionRequestDto,
) {
  const updatedFoodIntroductionEntityBuilder =
    new FoodIntroductionEntityBuilder(foodIntroductionEntity);

  if (updateFoodIntroductionRequestDto.foodName) {
    updatedFoodIntroductionEntityBuilder.withFoodName(
      updateFoodIntroductionRequestDto.foodName,
    );
  }

  if (updateFoodIntroductionRequestDto.date) {
    updatedFoodIntroductionEntityBuilder.withDate(
      updateFoodIntroductionRequestDto.date,
    );
  }

  if (updateFoodIntroductionRequestDto.preparation) {
    updatedFoodIntroductionEntityBuilder.withPreparation(
      updateFoodIntroductionRequestDto.preparation,
    );
  }

  if (updateFoodIntroductionRequestDto.presentation) {
    updatedFoodIntroductionEntityBuilder.withPresentation(
      updateFoodIntroductionRequestDto.presentation,
    );
  }

  if (updateFoodIntroductionRequestDto.result) {
    updatedFoodIntroductionEntityBuilder.withResult(
      updateFoodIntroductionRequestDto.result,
    );
  }

  return updatedFoodIntroductionEntityBuilder.build();
}
