import { parentResponseDtoFactory } from '../../parents/factories/parent-response-dto.factory';
import { ShareBabyInvitationResponseDto } from '../dtos/share-baby-invitation.response.dto';
import { ShareBabyInvitationEntity } from '../share-baby-invitation.entity';
import { babyResponseDtoFactory } from './baby-response-dto.factory';

export function shareBabyInvitationResponseDtoFactory(
  shareBabyInvitationEntity: ShareBabyInvitationEntity,
) {
  const shareBabyInvitationResponseDto: ShareBabyInvitationResponseDto = {
    id: shareBabyInvitationEntity.id,
    date: shareBabyInvitationEntity.date,
    otherParentEmail: shareBabyInvitationEntity.otherParentEmail,
    status: shareBabyInvitationEntity.status,
    baby: babyResponseDtoFactory(shareBabyInvitationEntity.baby),
    requester: parentResponseDtoFactory(shareBabyInvitationEntity.requester),
  };

  return shareBabyInvitationResponseDto;
}
