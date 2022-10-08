import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
} from '@nestjs/common';
import { BabiesService } from './babies.service';
import { CreateBabyRequestDto } from './dtos/create/create-baby.request.dto';
import { SendShareBabyInvitationRequestDto } from './dtos/share/send-share-baby-invitation.request.dto';
import { AnswerShareBabyInvitationRequestDto } from './dtos/share/answer-share-baby-invitation.request.dto';

@Controller('babies')
export class BabiesController {
  constructor(private readonly babiesService: BabiesService) {}

  @Get('/')
  getAllBabies() {
    return this.babiesService.getAllBabies();
  }

  @Get('/share-invitations')
  getAllBabyShareInvitations(@Request() request) {
    return this.babiesService.getAllBabyShareInvitations(request.user);
  }

  @Get('/:id')
  getBaby(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.babiesService.getBaby(id);
  }

  @Get('/share-invitations/:id')
  getBabyShareInvitation(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.babiesService.getBabyShareInvitation(id);
  }

  @Post('/')
  createBaby(
    @Request() request,
    @Body() createBabyRequestDto: CreateBabyRequestDto,
  ) {
    return this.babiesService.createBaby(request.user, createBabyRequestDto);
  }

  @Delete('/:id')
  removeBaby(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.babiesService.removeBaby(id);
  }

  @Post('/send-share-invitation')
  sendShareBabyInvitation(
    @Request() request,
    @Body()
    sendShareBabyInvitationRequestDto: SendShareBabyInvitationRequestDto,
  ) {
    return this.babiesService.sendShareBabyInvitation(
      request.user,
      sendShareBabyInvitationRequestDto,
    );
  }

  @Post('/answer-share-invitation')
  answerShareBabyInvitation(
    @Request() request,
    @Body()
    answerShareBabyInvitationRequestDto: AnswerShareBabyInvitationRequestDto,
  ) {
    return this.babiesService.answerShareBabyInvitation(
      request.user,
      answerShareBabyInvitationRequestDto,
    );
  }
}
