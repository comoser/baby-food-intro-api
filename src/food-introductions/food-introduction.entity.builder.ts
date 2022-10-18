import {
  FoodIntroductionEntity,
  FoodIntroductionResult,
} from './food-introduction.entity';
import { BabyEntity } from '../babies/baby.entity';

export class FoodIntroductionEntityBuilder {
  private readonly foodIntroductionEntity: FoodIntroductionEntity;

  constructor(foodIntroductionEntity?: FoodIntroductionEntity) {
    if (foodIntroductionEntity)
      this.foodIntroductionEntity = foodIntroductionEntity;
    else this.foodIntroductionEntity = new FoodIntroductionEntity();
  }

  withFoodName(foodName: string) {
    this.foodIntroductionEntity.foodName = foodName;
    return this;
  }

  withDate(date: string) {
    this.foodIntroductionEntity.date = date;
    return this;
  }

  withPreparation(preparation: string) {
    this.foodIntroductionEntity.preparation = preparation;
    return this;
  }

  withPresentation(presentation: string) {
    this.foodIntroductionEntity.presentation = presentation;
    return this;
  }

  withResult(result: FoodIntroductionResult) {
    this.foodIntroductionEntity.result = result;
    return this;
  }

  withBaby(baby: BabyEntity) {
    this.foodIntroductionEntity.baby = baby;
    return this;
  }

  build() {
    return this.foodIntroductionEntity;
  }
}
