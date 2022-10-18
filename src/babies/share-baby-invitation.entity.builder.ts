import { BabyEntity } from './baby.entity';
import { ParentEntity } from '../parents/parent.entity';
import {
  ShareBabyInvitationEntity,
  ShareBabyInvitationStatus,
} from './share-baby-invitation.entity';

export class ShareBabyInvitationEntityBuilder {
  private readonly shareBabyInvitationEntity: ShareBabyInvitationEntity;

  constructor(shareBabyInvitationEntity?: ShareBabyInvitationEntity) {
    if (shareBabyInvitationEntity)
      this.shareBabyInvitationEntity = shareBabyInvitationEntity;
    else this.shareBabyInvitationEntity = new ShareBabyInvitationEntity();
  }

  withRequester(requester: ParentEntity) {
    this.shareBabyInvitationEntity.requester = requester;
    return this;
  }

  withBaby(baby: BabyEntity) {
    this.shareBabyInvitationEntity.baby = baby;
    return this;
  }

  withOtherParentEmail(otherParentEmail: string) {
    this.shareBabyInvitationEntity.otherParentEmail = otherParentEmail;
    return this;
  }

  withDate(date: string) {
    this.shareBabyInvitationEntity.date = date;
    return this;
  }

  withStatus(status: ShareBabyInvitationStatus) {
    this.shareBabyInvitationEntity.status = status;
    return this;
  }

  build() {
    return this.shareBabyInvitationEntity;
  }
}
