import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthUser } from '../types/auth-user';
import { CreateBabyRequestDto } from './dtos/create/create-baby.request.dto';
import { Repository } from 'typeorm';
import { BabyEntity } from './baby.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { babyEntityFactory } from './factories/baby-entity.factory';
import { ParentIntegrationService } from '../parents/integrations/parent-integration.service';
import { HttpResponseDto } from '../dtos/http.response.dto';
import { CreateBabyResponseDto } from './dtos/create/create-baby.response.dto';
import { babyResponseDtoFactory } from './factories/baby-response-dto.factory';
import { BabyNotFoundException } from './exceptions/baby-not-found.exception';
import { ParentNotFoundException } from '../parents/exceptions/parent-not-found.exception';
import { GetBabyResponseDto } from './dtos/get/get-baby.response.dto';

@Injectable()
export class BabiesService {
  constructor(
    private readonly parentIntegrationService: ParentIntegrationService,
    @InjectRepository(BabyEntity)
    private readonly babiesRepository: Repository<BabyEntity>,
  ) {}

  async getAllBabies() {
    const storedBabyEntities = await this.babiesRepository.find();

    return HttpResponseDto.createHttpResponseDto<GetBabyResponseDto[]>(
      HttpStatus.OK,
      {
        data: storedBabyEntities.map((baby) => babyResponseDtoFactory(baby)),
      },
    );
  }

  async getBaby(id: string) {
    const storedBabyEntity = await this.babiesRepository.findOneBy({ id });
    if (!storedBabyEntity) {
      throw new BabyNotFoundException();
    }

    return HttpResponseDto.createHttpResponseDto<GetBabyResponseDto>(
      HttpStatus.OK,
      {
        data: babyResponseDtoFactory(storedBabyEntity, true),
      },
    );
  }

  async createBaby(
    parent: AuthUser,
    createBabyRequestDto: CreateBabyRequestDto,
  ) {
    const storedParentEntity = await this.parentIntegrationService.findParentBy(
      parent.email,
    );
    if (!storedParentEntity) {
      throw new ParentNotFoundException();
    }

    const babyEntity = babyEntityFactory(
      storedParentEntity,
      createBabyRequestDto,
    );
    const storedBabyEntity = await this.babiesRepository.save(babyEntity);

    return HttpResponseDto.createHttpResponseDto<CreateBabyResponseDto>(
      HttpStatus.CREATED,
      {
        data: babyResponseDtoFactory(storedBabyEntity),
      },
    );
  }

  async removeBaby(id: string) {
    const storedBabyEntity = await this.babiesRepository.findOneBy({ id });
    if (!storedBabyEntity) {
      throw new BabyNotFoundException();
    }

    await this.babiesRepository.remove(storedBabyEntity);

    return HttpResponseDto.createHttpResponseDto(HttpStatus.NO_CONTENT);
  }
}
