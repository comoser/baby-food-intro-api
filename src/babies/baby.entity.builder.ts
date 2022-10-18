import { BabyEntity } from './baby.entity';
import { ParentEntity } from '../parents/parent.entity';

export class BabyEntityBuilder {
  private readonly babyEntity: BabyEntity;

  constructor(babyEntity?: BabyEntity) {
    if (babyEntity) this.babyEntity = babyEntity;
    else this.babyEntity = new BabyEntity();
  }

  withFirstName(firstName: string) {
    this.babyEntity.firstName = firstName;
    return this;
  }

  withLastName(lastName: string) {
    this.babyEntity.lastName = lastName;
    return this;
  }

  withDateOfBirth(dateOfBirth: string) {
    this.babyEntity.dateOfBirth = dateOfBirth;
    return this;
  }

  withIsActive(isActive: boolean) {
    this.babyEntity.isActive = isActive;
    return this;
  }

  withParents(parents: ParentEntity[]) {
    this.babyEntity.parents = parents;
    return this;
  }

  build() {
    return this.babyEntity;
  }
}
