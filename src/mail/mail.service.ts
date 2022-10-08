import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { BabyEntity } from '../babies/baby.entity';
import { ParentEntity } from '../parents/parent.entity';
import { ShareBabyInvitationStatus } from '../babies/share-baby-invitation.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendShareBabyInvitation(
    requester: ParentEntity,
    receiverEmail: string,
    baby: BabyEntity,
  ) {
    await this.mailerService.sendMail({
      to: receiverEmail,
      subject: 'Share Baby Invitation',
      template: './send-share-baby-invitation-template',
      context: {
        requester_name: `${requester.firstName} ${requester.lastName}`,
        baby_name: `${baby.firstName} ${baby.lastName}`,
      },
    });
  }

  async answerShareBabyInvitation(
    requester: ParentEntity,
    otherParent: ParentEntity,
    baby: BabyEntity,
    result: ShareBabyInvitationStatus,
  ) {
    await this.mailerService.sendMail({
      to: requester.email,
      subject: 'Share Baby Invitation Answer',
      template: './answer-share-baby-invitation-template',
      context: {
        other_parent_name: `${otherParent.firstName} ${otherParent.lastName}`,
        baby_name: `${baby.firstName} ${baby.lastName}`,
        invitation_answer:
          result === ShareBabyInvitationStatus.Accepted
            ? 'Accepted'
            : 'Rejected',
      },
    });
  }
}
