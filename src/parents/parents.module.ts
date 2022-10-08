import { Module } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParentEntity } from './parent.entity';
import { ParentsController } from './parents.controller';
import { ParentIntegrationService } from './integrations/parent-integration.service';

@Module({
  imports: [TypeOrmModule.forFeature([ParentEntity])],
  controllers: [ParentsController],
  providers: [ParentsService, ParentIntegrationService],
  exports: [ParentIntegrationService],
})
export class ParentsModule {}
