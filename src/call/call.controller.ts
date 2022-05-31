import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CallService } from './call.service';

@Controller('call')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Get('/activityfeed')
  @UseGuards(AuthGuard())
  async getDetails(): Promise<any> {
    return await this.callService.getActivityFeed();
  }
}
