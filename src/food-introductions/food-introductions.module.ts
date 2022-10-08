import { Module } from '@nestjs/common';
import { FoodIntroductionsService } from './food-introductions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodIntroductionEntity } from './food-introduction.entity';
import { FoodIntroductionsController } from './food-introductions.controller';
import { BabiesModule } from '../babies/babies.module';

@Module({
  imports: [BabiesModule, TypeOrmModule.forFeature([FoodIntroductionEntity])],
  controllers: [FoodIntroductionsController],
  providers: [FoodIntroductionsService],
})
export class FoodIntroductionsModule {}
