import { BabyResponseDto } from './baby.response.dto';
import { ParentResponseDto } from '../../parents/dtos/parent.response.dto';

export type ShareBabyInvitationResponseDto = {
  id: string;
  date: string;
  otherParentEmail: string;
  status: number;
  requester: ParentResponseDto;
  baby: BabyResponseDto;
};
