import { ParentEntity } from '../parent.entity';
import { hashPassword } from '../../security/hash';
import { ParentEntityBuilder } from '../parent.entity.builder';
import { UpdateParentProfileRequestDto } from '../dtos/update/update-parent-profile.request.dto';

export async function updateParentEntityFactory(
  parentEntity: ParentEntity,
  updateParentProfileRequestDto: UpdateParentProfileRequestDto,
): Promise<ParentEntity> {
  const updatedParentEntityBuilder = new ParentEntityBuilder(parentEntity);

  if (updateParentProfileRequestDto.firstName) {
    updatedParentEntityBuilder.withFirstName(
      updateParentProfileRequestDto.firstName,
    );
  }

  if (updateParentProfileRequestDto.lastName) {
    updatedParentEntityBuilder.withLastName(
      updateParentProfileRequestDto.lastName,
    );
  }

  if (updateParentProfileRequestDto.dateOfBirth) {
    updatedParentEntityBuilder.withDateOfBirth(
      updateParentProfileRequestDto.dateOfBirth.split('T')[0],
    );
  }

  if (updateParentProfileRequestDto.password) {
    updatedParentEntityBuilder.withPassword(
      await hashPassword(updateParentProfileRequestDto.password),
    );
  }

  return updatedParentEntityBuilder.build();
}
