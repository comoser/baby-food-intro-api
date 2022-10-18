import { SendShareBabyInvitationRequestDto } from '../dtos/share/send-share-baby-invitation.request.dto';
import { ShareBabyInvitationStatus } from '../share-baby-invitation.entity';
import { ParentEntity } from '../../parents/parent.entity';
import { BabyEntity } from '../baby.entity';
import { ShareBabyInvitationEntityBuilder } from '../share-baby-invitation.entity.builder';

export function shareBabyInvitationEntityFactory(
  requesterParent: ParentEntity,
  baby: BabyEntity,
  shareBabyInvitationRequestDto: SendShareBabyInvitationRequestDto,
) {
  return new ShareBabyInvitationEntityBuilder()
    .withDate(new Date().toISOString())
    .withOtherParentEmail(shareBabyInvitationRequestDto.otherParentEmail)
    .withRequester(requesterParent)
    .withBaby(baby)
    .withStatus(ShareBabyInvitationStatus.Pending)
    .build();
}
