import { ParentEntity } from '../parent.entity';
import { ParentResponseDto } from '../dtos/parent.response.dto';

export function parentResponseDtoFactory(parentEntity: ParentEntity) {
  const parentResponseDto: ParentResponseDto = {
    id: parentEntity.id,
    firstName: parentEntity.firstName,
    lastName: parentEntity.lastName,
    dateOfBirth: parentEntity.dateOfBirth,
  };

  return parentResponseDto;
}
