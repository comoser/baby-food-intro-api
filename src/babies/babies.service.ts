import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthUser } from '../types/auth-user';
import { CreateBabyRequestDto } from './dtos/create/create-baby.request.dto';
import { Repository } from 'typeorm';
import { BabyEntity } from './baby.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { babyEntityFactory } from './factories/baby-entity.factory';
import { ParentIntegrationService } from '../parents/integrations/parent-integration.service';
import { HttpResponseDto } from '../dtos/http.response.dto';
import { CreateBabyResponseDto } from './dtos/create/create-baby.response.dto';
import { babyResponseDtoFactory } from './factories/baby-response-dto.factory';
import { BabyNotFoundException } from './exceptions/baby-not-found.exception';
import { ParentNotFoundException } from '../parents/exceptions/parent-not-found.exception';
import { GetBabyResponseDto } from './dtos/get/get-baby.response.dto';
import { SendShareBabyInvitationRequestDto } from './dtos/share/send-share-baby-invitation.request.dto';
import { shareBabyInvitationEntityFactory } from './factories/share-baby-invitation-entity.factory';
import {
  ShareBabyInvitationEntity,
  ShareBabyInvitationStatus,
} from './share-baby-invitation.entity';
import { AnswerShareBabyInvitationRequestDto } from './dtos/share/answer-share-baby-invitation.request.dto';
import { ShareBabyInvitationNotFoundException } from './exceptions/share-baby-invitation-not-found.exception';
import { GetShareBabyInvitationResponseDto } from './dtos/get/get-share-baby-invitation.response.dto';
import { shareBabyInvitationResponseDtoFactory } from './factories/share-baby-invitation-response-dto.factory';
import { MailService } from '../mail/mail.service';
import { ShareBabyInvitationAlreadySentException } from './exceptions/share-baby-invitation-already-sent.exception';

@Injectable()
export class BabiesService {
  constructor(
    private readonly mailService: MailService,
    private readonly parentIntegrationService: ParentIntegrationService,
    @InjectRepository(BabyEntity)
    private readonly babiesRepository: Repository<BabyEntity>,
    @InjectRepository(ShareBabyInvitationEntity)
    private readonly shareBabyInvitationsRepository: Repository<ShareBabyInvitationEntity>,
  ) {}

  async getAllBabies() {
    const storedBabyEntities = await this.babiesRepository.find();

    return HttpResponseDto.createHttpResponseDto<GetBabyResponseDto[]>(
      HttpStatus.OK,
      {
        data: storedBabyEntities.map((baby) => babyResponseDtoFactory(baby)),
      },
    );
  }

  async getBaby(id: string) {
    const storedBabyEntity = await this.babiesRepository.findOneBy({ id });
    if (!storedBabyEntity) {
      throw new BabyNotFoundException();
    }

    return HttpResponseDto.createHttpResponseDto<GetBabyResponseDto>(
      HttpStatus.OK,
      {
        data: babyResponseDtoFactory(storedBabyEntity, true),
      },
    );
  }

  async createBaby(
    parent: AuthUser,
    createBabyRequestDto: CreateBabyRequestDto,
  ) {
    const storedParentEntity = await this.parentIntegrationService.findParentBy(
      parent.email,
    );
    if (!storedParentEntity) {
      throw new ParentNotFoundException();
    }

    const babyEntity = babyEntityFactory(
      storedParentEntity,
      createBabyRequestDto,
    );
    const storedBabyEntity = await this.babiesRepository.save(babyEntity);

    return HttpResponseDto.createHttpResponseDto<CreateBabyResponseDto>(
      HttpStatus.CREATED,
      {
        data: babyResponseDtoFactory(storedBabyEntity),
      },
    );
  }

  async removeBaby(id: string) {
    const storedBabyEntity = await this.babiesRepository.findOneBy({ id });
    if (!storedBabyEntity) {
      throw new BabyNotFoundException();
    }

    await this.babiesRepository.remove(storedBabyEntity);

    return HttpResponseDto.createHttpResponseDto(HttpStatus.NO_CONTENT);
  }

  async getAllBabyShareInvitations(parent: AuthUser) {
    const storedShareBabyInvitationEntities =
      await this.shareBabyInvitationsRepository.findBy({
        otherParentEmail: parent.email,
      });

    return HttpResponseDto.createHttpResponseDto<
      GetShareBabyInvitationResponseDto[]
    >(HttpStatus.OK, {
      data: storedShareBabyInvitationEntities.map((invitation) =>
        shareBabyInvitationResponseDtoFactory(invitation),
      ),
    });
  }

  async getBabyShareInvitation(id: string) {
    const storedShareBabyInvitationEntity =
      await this.shareBabyInvitationsRepository.findOneBy({ id });

    return HttpResponseDto.createHttpResponseDto<GetShareBabyInvitationResponseDto>(
      HttpStatus.OK,
      {
        data: shareBabyInvitationResponseDtoFactory(
          storedShareBabyInvitationEntity,
        ),
      },
    );
  }

  async sendShareBabyInvitation(
    parent: AuthUser,
    sendShareBabyInvitationRequestDto: SendShareBabyInvitationRequestDto,
  ) {
    const storedParentEntity = await this.parentIntegrationService.findParentBy(
      parent.email,
    );
    if (!storedParentEntity) {
      throw new ParentNotFoundException();
    }

    const storedBabyEntity = await this.babiesRepository.findOneBy({
      id: sendShareBabyInvitationRequestDto.babyId,
    });
    if (!storedBabyEntity) {
      throw new BabyNotFoundException();
    }

    const storedShareBabyInvitation =
      await this.shareBabyInvitationsRepository.findOneBy({
        baby: storedBabyEntity,
        otherParentEmail: sendShareBabyInvitationRequestDto.otherParentEmail,
      });
    if (storedShareBabyInvitation) {
      throw new ShareBabyInvitationAlreadySentException();
    }

    const shareBabyInvitationEntity = shareBabyInvitationEntityFactory(
      storedParentEntity,
      storedBabyEntity,
      sendShareBabyInvitationRequestDto,
    );
    await this.shareBabyInvitationsRepository.save(shareBabyInvitationEntity);

    this.mailService.sendShareBabyInvitation(
      storedParentEntity,
      shareBabyInvitationEntity.otherParentEmail,
      storedBabyEntity,
    );

    return HttpResponseDto.createHttpResponseDto(HttpStatus.NO_CONTENT);
  }

  async answerShareBabyInvitation(
    parent: AuthUser,
    answerShareBabyInvitationRequestDto: AnswerShareBabyInvitationRequestDto,
  ) {
    const storedParentEntity = await this.parentIntegrationService.findParentBy(
      parent.email,
    );
    if (!storedParentEntity) {
      throw new ParentNotFoundException();
    }

    const storedInvitationEntity =
      await this.shareBabyInvitationsRepository.findOneBy({
        id: answerShareBabyInvitationRequestDto.invitationId,
      });
    if (!storedInvitationEntity) {
      throw new ShareBabyInvitationNotFoundException();
    }

    storedInvitationEntity.status = answerShareBabyInvitationRequestDto.accepted
      ? ShareBabyInvitationStatus.Accepted
      : ShareBabyInvitationStatus.Rejected;

    await this.shareBabyInvitationsRepository.save(storedInvitationEntity);

    if (storedInvitationEntity.status === ShareBabyInvitationStatus.Accepted) {
      storedInvitationEntity.baby.parents.push(storedParentEntity);

      await this.babiesRepository.save(storedInvitationEntity.baby);
    }

    this.mailService.answerShareBabyInvitation(
      storedInvitationEntity.requester,
      storedParentEntity,
      storedInvitationEntity.baby,
      storedInvitationEntity.status,
    );

    return HttpResponseDto.createHttpResponseDto(HttpStatus.NO_CONTENT);
  }
}
