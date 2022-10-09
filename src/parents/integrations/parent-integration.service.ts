import { Injectable } from '@nestjs/common';
import { ParentEntity } from '../parent.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParentIntegrationService {
  constructor(
    @InjectRepository(ParentEntity)
    private parentsRepository: Repository<ParentEntity>,
  ) {}

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
