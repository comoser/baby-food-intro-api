import { ParentEntity } from './parent.entity';
import { BabyEntity } from '../babies/baby.entity';

export class ParentEntityBuilder {
  private readonly parentEntity: ParentEntity;

  constructor(parentEntity?: ParentEntity) {
    if (parentEntity) this.parentEntity = parentEntity;
    else this.parentEntity = new ParentEntity();
  }

  withFirstName(firstName: string) {
    this.parentEntity.firstName = firstName;
    return this;
  }

  withLastName(lastName: string) {
    this.parentEntity.lastName = lastName;
    return this;
  }

  withDateOfBirth(dateOfBirth: string) {
    this.parentEntity.dateOfBirth = dateOfBirth;
    return this;
  }

  withEmail(email: string) {
    this.parentEntity.email = email;
    return this;
  }

  withPassword(password: string) {
    this.parentEntity.password = password;
    return this;
  }

  withChildren(children: BabyEntity[]) {
    this.parentEntity.children = children;
    return this;
  }

  build() {
    return this.parentEntity;
  }
}
