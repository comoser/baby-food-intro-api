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

@Controller('babies')
export class BabiesController {
  constructor(private readonly babiesService: BabiesService) {}

  @Get('/')
  getAllBabies() {
    return this.babiesService.getAllBabies();
  }

  @Get('/:id')
  getBaby(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.babiesService.getBaby(id);
  }

  // @Post('/share')
  // shareBaby(
  //   @Request() request,
  //   @Body() shareBabyRequestDto: ShareBabyRequestDto,
  // ) {
  //   return this.babiesService.shareBaby(request.user, shareBabyRequestDto);
  // }

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
}
