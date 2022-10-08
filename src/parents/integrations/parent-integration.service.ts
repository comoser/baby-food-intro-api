import { Injectable } from '@nestjs/common';
import { ParentEntity } from '../parent.entity';
import { Repository } from 'typeorm';
import { ParentDto } from '../dtos/parent.dto';
import { hashPassword } from '../../security/hash';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParentIntegrationService {
  constructor(
    @InjectRepository(ParentEntity)
    private parentsRepository: Repository<ParentEntity>,
  ) {}

  static async createParentEntity(parentDto: ParentDto): Promise<ParentEntity> {
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
