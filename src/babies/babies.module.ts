import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BabyEntity } from './baby.entity';
import { BabiesController } from './babies.controller';
import { BabiesService } from './babies.service';
import { ParentsModule } from '../parents/parents.module';
import { BabyIntegrationService } from './integrations/baby-integration.service';

@Module({
  imports: [ParentsModule, TypeOrmModule.forFeature([BabyEntity])],
  controllers: [BabiesController],
  providers: [BabiesService, BabyIntegrationService],
  exports: [BabyIntegrationService],
})
export class BabiesModule {}
