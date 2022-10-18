import { BabyEntity } from '../baby.entity';
import { UpdateBabyRequestDto } from '../dtos/update/update-baby.request.dto';
import { BabyEntityBuilder } from '../baby.entity.builder';

export function updateBabyEntityFactory(
  babyEntity: BabyEntity,
  updateBabyRequestDto: UpdateBabyRequestDto,
) {
  const updatedBabyEntityBuilder = new BabyEntityBuilder(babyEntity);

  if (updateBabyRequestDto.firstName) {
    updatedBabyEntityBuilder.withFirstName(updateBabyRequestDto.firstName);
  }

  if (updateBabyRequestDto.firstName) {
    updatedBabyEntityBuilder.withLastName(updateBabyRequestDto.lastName);
  }

  if (updateBabyRequestDto.dateOfBirth) {
    updatedBabyEntityBuilder.withDateOfBirth(
      updateBabyRequestDto.dateOfBirth.split('T')[0],
    );
  }

  return updatedBabyEntityBuilder.build();
}
