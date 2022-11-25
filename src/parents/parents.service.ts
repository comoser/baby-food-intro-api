import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ParentEntity } from './parent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUser } from '../types/auth-user';
import { UpdateParentProfileRequestDto } from './dtos/update/update-parent-profile.request.dto';
import { ParentNotFoundException } from './exceptions/parent-not-found.exception';
import { HttpResponseDto } from '../dtos/http.response.dto';
import { ParentResponseDto } from './dtos/parent.response.dto';
import { parentResponseDtoFactory } from './factories/parent-response-dto.factory';
import { updateParentEntityFactory } from './factories/update-parent-entity.factory';

@Injectable()
export class ParentsService {
  private readonly logger: Logger = new Logger(ParentsService.name);

  constructor(
    @InjectRepository(ParentEntity)
    private readonly parentsRepository: Repository<ParentEntity>,
  ) {}

  async getParentProfile(parent: AuthUser) {
    this.logger.log(`Received request to get parent profile ${parent.email}`);

    const storedParentEntity = await this.findParentOrThrow(parent.email);

    return HttpResponseDto.createHttpResponseDto<ParentResponseDto>(
      HttpStatus.OK,
      {
        data: parentResponseDtoFactory(storedParentEntity),
      },
    );
  }

  async updateParentProfile(
    parent: AuthUser,
    updateParentProfileRequestDto: UpdateParentProfileRequestDto,
  ) {
    this.logger.log(
      `Received request to update parent profile with email ${parent.email}`,
    );

    const storedParentEntity = await this.findParentOrThrow(parent.email);

    const updatedParentEntity = await updateParentEntityFactory(
      storedParentEntity,
      updateParentProfileRequestDto,
    );

    await this.parentsRepository.save(updatedParentEntity);

    return HttpResponseDto.createHttpResponseDto<ParentResponseDto>(
      HttpStatus.OK,
      {
        data: parentResponseDtoFactory(updatedParentEntity),
      },
    );
  }

  private async findParentOrThrow(email: string) {
    const storedParentEntity = await this.parentsRepository.findOneBy({
      email,
    });
    if (!storedParentEntity) {
      throw new ParentNotFoundException();
    }

    return storedParentEntity;
  }
}
