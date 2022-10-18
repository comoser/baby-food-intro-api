import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthUser } from '../types/auth-user';
import { CreateBabyRequestDto } from './dtos/create/create-baby.request.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BabyEntity } from './baby.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createBabyEntityFactory } from './factories/create-baby-entity.factory';
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
import { UpdateBabyRequestDto } from './dtos/update/update-baby.request.dto';
import { BabyDontBelongToParentException } from './exceptions/baby-dont-belong-to-parent.exception';
import { UpdateBabyResponseDto } from './dtos/update/update-baby.response.dto';
import { updateBabyEntityFactory } from './factories/update-baby-entity.factory';

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

  async getAllBabies(parent: AuthUser) {
    const storedBabyEntities = await this.babiesRepository.find({
      where: {
        parents: [parent],
      },
    });

    return HttpResponseDto.createHttpResponseDto<GetBabyResponseDto[]>(
      HttpStatus.OK,
      {
        data: storedBabyEntities.map((baby) => babyResponseDtoFactory(baby)),
      },
    );
  }

  async getBaby(parent: AuthUser, id: string) {
    const storedBabyEntity = await this.findBabyOrThrow(id);

    await this.checkIfBabyIsChildOfAuthenticatedParentOrThrow(
      storedBabyEntity,
      parent,
    );

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
    const storedParentEntity = await this.findParentOrThrow(parent.email);

    const babyEntity = createBabyEntityFactory(
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

  async updateBaby(
    parent: AuthUser,
    id: string,
    updateBabyRequestDto: UpdateBabyRequestDto,
  ) {
    const storedBabyEntity = await this.findBabyOrThrow(id);

    await this.checkIfBabyIsChildOfAuthenticatedParentOrThrow(
      storedBabyEntity,
      parent,
    );

    const updatedBabyEntity = updateBabyEntityFactory(
      storedBabyEntity,
      updateBabyRequestDto,
    );

    await this.babiesRepository.save(updatedBabyEntity);

    return HttpResponseDto.createHttpResponseDto<UpdateBabyResponseDto>(
      HttpStatus.OK,
      {
        data: babyResponseDtoFactory(updatedBabyEntity),
      },
    );
  }

  async removeBaby(parent: AuthUser, id: string) {
    const storedBabyEntity = await this.findBabyOrThrow(id);

    await this.checkIfBabyIsChildOfAuthenticatedParentOrThrow(
      storedBabyEntity,
      parent,
    );

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

  async getBabyShareInvitation(parent: AuthUser, id: string) {
    const storedShareBabyInvitationEntity =
      await this.findShareBabyInvitationOrThrow({ id, requester: parent });

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
    const storedParentEntity = await this.findParentOrThrow(parent.email);

    const storedBabyEntity = await this.findBabyOrThrow(
      sendShareBabyInvitationRequestDto.babyId,
    );

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
    const storedParentEntity = await this.findParentOrThrow(parent.email);

    const storedShareBabyInvitationEntity =
      await this.findShareBabyInvitationOrThrow({
        id: answerShareBabyInvitationRequestDto.invitationId,
      });

    storedShareBabyInvitationEntity.status =
      answerShareBabyInvitationRequestDto.accepted
        ? ShareBabyInvitationStatus.Accepted
        : ShareBabyInvitationStatus.Rejected;

    await this.shareBabyInvitationsRepository.save(
      storedShareBabyInvitationEntity,
    );

    if (
      storedShareBabyInvitationEntity.status ===
      ShareBabyInvitationStatus.Accepted
    ) {
      storedShareBabyInvitationEntity.baby.parents.push(storedParentEntity);

      await this.babiesRepository.save(storedShareBabyInvitationEntity.baby);
    }

    this.mailService.answerShareBabyInvitation(
      storedShareBabyInvitationEntity.requester,
      storedParentEntity,
      storedShareBabyInvitationEntity.baby,
      storedShareBabyInvitationEntity.status,
    );

    return HttpResponseDto.createHttpResponseDto(HttpStatus.NO_CONTENT);
  }

  private async findParentOrThrow(parentEmail: string) {
    const storedParentEntity = await this.parentIntegrationService.findParentBy(
      parentEmail,
    );
    if (!storedParentEntity) {
      throw new ParentNotFoundException();
    }

    return storedParentEntity;
  }

  private async findBabyOrThrow(babyId: string) {
    const storedBabyEntity = await this.babiesRepository.findOneBy({
      id: babyId,
    });
    if (!storedBabyEntity) {
      throw new BabyNotFoundException();
    }

    return storedBabyEntity;
  }

  private async findShareBabyInvitationOrThrow(
    whereOptions: FindOptionsWhere<ShareBabyInvitationEntity>,
  ) {
    const storedShareBabyInvitationEntity =
      await this.shareBabyInvitationsRepository.findOneBy(whereOptions);
    if (!storedShareBabyInvitationEntity) {
      throw new ShareBabyInvitationNotFoundException();
    }

    return storedShareBabyInvitationEntity;
  }

  private async checkIfBabyIsChildOfAuthenticatedParentOrThrow(
    baby: BabyEntity,
    parent: AuthUser,
  ) {
    if (!baby.parents.map((parent) => parent.id).includes(parent.id)) {
      throw new BabyDontBelongToParentException();
    }
  }
}
