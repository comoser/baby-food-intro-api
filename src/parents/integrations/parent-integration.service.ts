import { Injectable } from '@nestjs/common';
import { ParentEntity } from '../parent.entity';
import { Repository } from 'typeorm';
import { CreateParentRequestDto } from '../dtos/create/create-parent.request.dto';
import { hashPassword } from '../../security/hash';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParentIntegrationService {
  constructor(
    @InjectRepository(ParentEntity)
    private parentsRepository: Repository<ParentEntity>,
  ) {}

  static async createParentEntity(
    parentDto: CreateParentRequestDto,
  ): Promise<ParentEntity> {
    const parentEntity = new ParentEntity();

    parentEntity.firstName = parentDto.firstName;
    parentEntity.lastName = parentDto.lastName;
    parentEntity.dateOfBirth = parentDto.dateOfBirth.split('T')[0];
    parentEntity.email = parentDto.email;
    parentEntity.password = await hashPassword(parentDto.password);
    parentEntity.children = [];

    return parentEntity;
  }

  async findParentBy(email: string) {
    return this.parentsRepository.findOne({
      where: {
        email,
      },
    });
  }

  async saveParent(parentEntity: ParentEntity) {
    return this.parentsRepository.save(parentEntity);
  }
}
