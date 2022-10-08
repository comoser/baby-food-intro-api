import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class SendShareBabyInvitationRequestDto {
  @IsEmail()
  @IsNotEmpty()
  otherParentEmail: string;

  @IsUUID()
  @IsNotEmpty()
  babyId: string;
}
