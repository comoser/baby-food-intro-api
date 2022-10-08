import { SendShareBabyInvitationRequestDto } from '../dtos/share/send-share-baby-invitation.request.dto';
import {
  ShareBabyInvitationEntity,
  ShareBabyInvitationStatus,
} from '../share-baby-invitation.entity';
import { ParentEntity } from '../../parents/parent.entity';
import { BabyEntity } from '../baby.entity';

export function shareBabyInvitationEntityFactory(
  requesterParent: ParentEntity,
  baby: BabyEntity,
  shareBabyInvitationRequestDto: SendShareBabyInvitationRequestDto,
) {
  const shareBabyInvitationEntity = new ShareBabyInvitationEntity();

  shareBabyInvitationEntity.date = new Date().toISOString();
  shareBabyInvitationEntity.otherParentEmail =
    shareBabyInvitationRequestDto.otherParentEmail;
  shareBabyInvitationEntity.requester = requesterParent;
  shareBabyInvitationEntity.baby = baby;
  shareBabyInvitationEntity.status = ShareBabyInvitationStatus.Pending;

  return shareBabyInvitationEntity;
}
