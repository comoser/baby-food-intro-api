import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class AnswerShareBabyInvitationRequestDto {
  @IsBoolean()
  @IsNotEmpty()
  accepted: boolean;

  @IsUUID()
  @IsNotEmpty()
  invitationId: string;
}
