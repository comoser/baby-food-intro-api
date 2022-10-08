import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BabyEntity } from '../baby.entity';

@Injectable()
export class BabyIntegrationService {
  constructor(
    @InjectRepository(BabyEntity)
    private babiesRepository: Repository<BabyEntity>,
  ) {}

  async findBabyBy(id: string) {
    return this.babiesRepository.findOne({
      where: {
        id,
      },
    });
  }
}
