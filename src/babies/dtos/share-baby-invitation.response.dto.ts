import { BabyResponseDto } from './baby.response.dto';
import { ParentResponseDto } from '../../parents/dtos/parent.response.dto';
import { ShareBabyInvitationStatus } from '../share-baby-invitation.entity';

export type ShareBabyInvitationResponseDto = {
  id: string;
  date: string;
  otherParentEmail: string;
  status: ShareBabyInvitationStatus;
  requester: ParentResponseDto;
  baby: BabyResponseDto;
};
