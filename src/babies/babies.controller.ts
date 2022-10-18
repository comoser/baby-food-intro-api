import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { BabiesService } from './babies.service';
import { CreateBabyRequestDto } from './dtos/create/create-baby.request.dto';
import { SendShareBabyInvitationRequestDto } from './dtos/share/send-share-baby-invitation.request.dto';
import { AnswerShareBabyInvitationRequestDto } from './dtos/share/answer-share-baby-invitation.request.dto';
import { UpdateBabyRequestDto } from './dtos/update/update-baby.request.dto';

@Controller('babies')
export class BabiesController {
  constructor(private readonly babiesService: BabiesService) {}

  @Get('/')
  getAllBabies(@Request() request) {
    return this.babiesService.getAllBabies(request.user);
  }

  @Get('/share-invitations')
  getAllBabyShareInvitations(@Request() request) {
    return this.babiesService.getAllBabyShareInvitations(request.user);
  }

  @Get('/:id')
  getBaby(@Request() request, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.babiesService.getBaby(request.user, id);
  }

  @Get('/share-invitations/:id')
  getBabyShareInvitation(
    @Request() request,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.babiesService.getBabyShareInvitation(request.user, id);
  }

  @Post('/')
  createBaby(
    @Request() request,
    @Body() createBabyRequestDto: CreateBabyRequestDto,
  ) {
    return this.babiesService.createBaby(request.user, createBabyRequestDto);
  }

  @Patch('/:id')
  updateBaby(
    @Request() request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBabyRequestDto: UpdateBabyRequestDto,
  ) {
    return this.babiesService.updateBaby(
      request.user,
      id,
      updateBabyRequestDto,
    );
  }

  @Delete('/:id')
  removeBaby(@Request() request, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.babiesService.removeBaby(request.user, id);
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
