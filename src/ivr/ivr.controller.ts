import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { IvrService } from './ivr.service';

@Controller('ivr')
export class IvrController {
  constructor(
    private ivrService: IvrService, // private callService:CallService
  ) {}

  @Post('/record/hangup')
  @Header('content-type', 'text/xml')
  voicemailCallBack(@Body() details: any) {
    return this.ivrService.voiceMailCallBack(details);
  }

  @Get('/record')
  @Header('content-type', 'text/xml')
  recordVoicemail() {
    return this.ivrService.recordVoicemail();
  }

  @Post('/voice')
  @Header('content-type', 'text/xml')
  combinedCall() {
    return this.ivrService.combinedCall();
  }
  @Post('transfercallback')
  @Header('content-type', 'text/xml')
  transferCallBack(@Body() details: any) {
    return this.ivrService.transferCallBack(details);
  }

  @Post('/gather')
  @Header('content-type', 'text/xml')
  async gather(@Body() digits: any) {
    //const details = this.ivrService.gather(digits);
    return this.ivrService.gather(digits);
  }
}
