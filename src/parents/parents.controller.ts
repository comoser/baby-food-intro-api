import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { UpdateParentProfileRequestDto } from './dtos/update/update-parent-profile.request.dto';

@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Get('/')
  async getParentProfile(@Request() request) {
    return this.parentsService.getParentProfile(request.user);
  }

  @Patch('/')
  async updateParentProfile(
    @Request() request,
    @Body() updateParentProfileRequestDto: UpdateParentProfileRequestDto,
  ) {
    return this.parentsService.updateParentProfile(
      request.user,
      updateParentProfileRequestDto,
    );
  }
}
