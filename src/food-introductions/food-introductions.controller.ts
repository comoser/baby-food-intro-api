import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
} from '@nestjs/common';
import { FoodIntroductionsService } from './food-introductions.service';
import { CreateFoodIntroductionRequestDto } from './dtos/create/create-food-introduction.request.dto';

@Controller('food-introductions')
export class FoodIntroductionsController {
  constructor(
    private readonly foodIntroductionsService: FoodIntroductionsService,
  ) {}

  @Get('/baby/:babyId')
  getAllFoodIntroductions(
    @Param('babyId', new ParseUUIDPipe()) babyId: string,
  ) {
    return this.foodIntroductionsService.getAllFoodIntroductions(babyId);
  }

  @Get('/:id')
  getFoodIntroduction(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.foodIntroductionsService.getFoodIntroduction(id);
  }

  @Post('/')
  createFoodIntroduction(
    @Request() request,
    @Body() createFoodIntroductionRequestDto: CreateFoodIntroductionRequestDto,
  ) {
    return this.foodIntroductionsService.createFoodIntroduction(
      createFoodIntroductionRequestDto,
    );
  }

  @Delete('/:id')
  removeFoodIntegration(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.foodIntroductionsService.removeFoodIntroduction(id);
  }
}
