import { BabyEntity } from '../baby.entity';
import { parentResponseDtoFactory } from '../../parents/factories/parent-response-dto.factory';
import { BabyResponseDto } from '../dtos/baby.response.dto';

export function babyResponseDtoFactory(
  babyEntity: BabyEntity,
  keepRelations = false,
) {
  function getParents() {
    if (keepRelations)
      return babyEntity.parents.map((parent) =>
        parentResponseDtoFactory(parent),
      );
    return babyEntity.parents.map((parent) => parent.id);
  }

  const babyResponseDto: BabyResponseDto = {
    id: babyEntity.id,
    firstName: babyEntity.firstName,
    lastName: babyEntity.lastName,
    dateOfBirth: babyEntity.dateOfBirth,
    isActive: babyEntity.isActive,
    parents: getParents(),
  };

  return babyResponseDto;
}
