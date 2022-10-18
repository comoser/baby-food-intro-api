import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FoodIntroductionEntity } from './food-introduction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFoodIntroductionRequestDto } from './dtos/create/create-food-introduction.request.dto';
import { BabyIntegrationService } from '../babies/integrations/baby-integration.service';
import { BabyNotFoundException } from '../babies/exceptions/baby-not-found.exception';
import { createFoodIntroductionEntityFactory } from './factories/create-food-introduction-entity.factory';
import { HttpResponseDto } from '../dtos/http.response.dto';
import { CreateFoodIntroductionResponseDto } from './dtos/create/create-food-introduction.response.dto';
import { foodIntroductionResponseDtoFactory } from './factories/food-introduction-response-dto.factory';
import { GetFoodIntroductionResponseDto } from './dtos/get/get-food-introduction.response.dto';
import { FoodIntroductionNotFoundException } from './exceptions/food-introduction-not-found.exception';
import { UpdateFoodIntroductionRequestDto } from './dtos/update/update-food-introduction.request.dto';
import { updateFoodIntroductionEntityFactory } from './factories/update-food-introduction-entity.factory';
import { UpdateFoodIntroductionResponseDto } from './dtos/update/update-food-introduction.response.dto';

@Injectable()
export class FoodIntroductionsService {
  constructor(
    private readonly babyIntegrationService: BabyIntegrationService,
    @InjectRepository(FoodIntroductionEntity)
    private readonly foodIntroductionsRepository: Repository<FoodIntroductionEntity>,
  ) {}

  async getAllFoodIntroductions(babyId: string) {
    const storedBabyEntity = await this.findBabyOrThrow(babyId);

    const storedFoodIntroductionsEntities =
      await this.foodIntroductionsRepository.find({
        where: {
          baby: storedBabyEntity,
        },
      });

    return HttpResponseDto.createHttpResponseDto<
      GetFoodIntroductionResponseDto[]
    >(HttpStatus.OK, {
      data: storedFoodIntroductionsEntities.map((foodIntroduction) =>
        foodIntroductionResponseDtoFactory(foodIntroduction),
      ),
    });
  }

  async getFoodIntroduction(id: string) {
    const storedFoodIntroductionEntity = await this.findFoodIntroductionOrThrow(
      id,
    );

    return HttpResponseDto.createHttpResponseDto<GetFoodIntroductionResponseDto>(
      HttpStatus.OK,
      {
        data: foodIntroductionResponseDtoFactory(
          storedFoodIntroductionEntity,
          true,
        ),
      },
    );
  }

  async createFoodIntroduction(
    createFoodIntroductionRequestDto: CreateFoodIntroductionRequestDto,
  ) {
    const storedBabyEntity = await this.findBabyOrThrow(
      createFoodIntroductionRequestDto.babyId,
    );

    const foodIntroductionEntity = createFoodIntroductionEntityFactory(
      storedBabyEntity,
      createFoodIntroductionRequestDto,
    );

    const storedFoodIntroductionEntity =
      await this.foodIntroductionsRepository.save(foodIntroductionEntity);

    return HttpResponseDto.createHttpResponseDto<CreateFoodIntroductionResponseDto>(
      HttpStatus.CREATED,
      {
        data: foodIntroductionResponseDtoFactory(storedFoodIntroductionEntity),
      },
    );
  }

  async updateFoodIntroduction(
    id: string,
    updateFoodIntroductionRequestDto: UpdateFoodIntroductionRequestDto,
  ) {
    const storedFoodIntroductionEntity = await this.findFoodIntroductionOrThrow(
      id,
    );

    const updatedFoodIntroductionEntity = updateFoodIntroductionEntityFactory(
      storedFoodIntroductionEntity,
      updateFoodIntroductionRequestDto,
    );

    await this.foodIntroductionsRepository.save(updatedFoodIntroductionEntity);

    return HttpResponseDto.createHttpResponseDto<UpdateFoodIntroductionResponseDto>(
      HttpStatus.OK,
      {
        data: foodIntroductionResponseDtoFactory(updatedFoodIntroductionEntity),
      },
    );
  }

  async removeFoodIntroduction(id: string) {
    const storedFoodIntroductionEntity = await this.findFoodIntroductionOrThrow(
      id,
    );

    await this.foodIntroductionsRepository.remove(storedFoodIntroductionEntity);

    return HttpResponseDto.createHttpResponseDto(HttpStatus.NO_CONTENT);
  }

  private async findBabyOrThrow(babyId: string) {
    const storedBabyEntity = await this.babyIntegrationService.findBabyBy(
      babyId,
    );
    if (!storedBabyEntity) {
      throw new BabyNotFoundException();
    }

    return storedBabyEntity;
  }

  private async findFoodIntroductionOrThrow(id: string) {
    const storedFoodIntroductionEntity =
      await this.foodIntroductionsRepository.findOneBy({
        id,
      });
    if (!storedFoodIntroductionEntity) {
      throw new FoodIntroductionNotFoundException();
    }

    return storedFoodIntroductionEntity;
  }
}
