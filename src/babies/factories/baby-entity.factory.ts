import { BabyEntity } from '../baby.entity';
import { ParentEntity } from '../../parents/parent.entity';
import { CreateBabyRequestDto } from '../dtos/create/create-baby.request.dto';

export function babyEntityFactory(
  parentEntity: ParentEntity,
  createBabyRequestDto: CreateBabyRequestDto,
) {
  const babyEntity = new BabyEntity();

  babyEntity.firstName = createBabyRequestDto.firstName;
  babyEntity.lastName = createBabyRequestDto.lastName;
  babyEntity.dateOfBirth = createBabyRequestDto.dateOfBirth.split('T')[0];
  babyEntity.isActive = true;
  babyEntity.parents = [parentEntity];

  return babyEntity;
}
