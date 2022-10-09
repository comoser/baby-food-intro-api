import { CreateParentRequestDto } from '../dtos/create/create-parent.request.dto';
import { ParentEntity } from '../parent.entity';
import { hashPassword } from '../../security/hash';

export async function parentEntityFactory(
  parentDto: CreateParentRequestDto,
): Promise<ParentEntity> {
  const parentEntity = new ParentEntity();

  parentEntity.firstName = parentDto.firstName;
  parentEntity.lastName = parentDto.lastName;
  parentEntity.dateOfBirth = parentDto.dateOfBirth.split('T')[0];
  parentEntity.email = parentDto.email;
  parentEntity.password = await hashPassword(parentDto.password);
  parentEntity.children = [];

  return parentEntity;
}
