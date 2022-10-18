import { CreateParentRequestDto } from '../dtos/create/create-parent.request.dto';
import { ParentEntity } from '../parent.entity';
import { hashPassword } from '../../security/hash';
import { ParentEntityBuilder } from '../parent.entity.builder';

export async function createParentEntityFactory(
  createParentRequestDto: CreateParentRequestDto,
): Promise<ParentEntity> {
  return new ParentEntityBuilder()
    .withFirstName(createParentRequestDto.firstName)
    .withLastName(createParentRequestDto.lastName)
    .withDateOfBirth(createParentRequestDto.dateOfBirth.split('T')[0])
    .withEmail(createParentRequestDto.email)
    .withPassword(await hashPassword(createParentRequestDto.password))
    .withChildren([])
    .build();
}
