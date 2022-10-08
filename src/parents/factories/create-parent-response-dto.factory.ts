import { ParentEntity } from '../parent.entity';
import { CreateParentResponseDto } from '../dtos/create-parent.response.dto';

export function createParentResponseDto(parentEntity: ParentEntity) {
  const createParentResponseDto: CreateParentResponseDto = {
    id: parentEntity.id,
    firstName: parentEntity.firstName,
    lastName: parentEntity.lastName,
    dateOfBirth: parentEntity.dateOfBirth,
  };

  return createParentResponseDto;
}
