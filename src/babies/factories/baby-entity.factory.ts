import { ParentEntity } from '../../parents/parent.entity';
import { CreateBabyRequestDto } from '../dtos/create/create-baby.request.dto';
import { BabyEntityBuilder } from '../baby.entity.builder';

export function babyEntityFactory(
  parentEntity: ParentEntity,
  createBabyRequestDto: CreateBabyRequestDto,
) {
  return new BabyEntityBuilder()
    .withFirstName(createBabyRequestDto.firstName)
    .withLastName(createBabyRequestDto.lastName)
    .withDateOfBirth(createBabyRequestDto.dateOfBirth.split('T')[0])
    .withIsActive(true)
    .withParents([parentEntity])
    .build();
}
