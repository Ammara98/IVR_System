import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { CallService } from 'src/call/call.service';
import { CreateCallDto } from 'src/call/dto/create-call.dto';
import { CreateVoiceMailDto } from 'src/call/dto/create-voicemail.dto';
import { twiml } from 'twilio';

@Injectable()
export class IvrService {
  public constructor(
    @InjectTwilio() private readonly client: TwilioClient,
    readonly callService: CallService,
    private configService:ConfigService
  ) {}

  combinedCall() {
    const vr = new twiml.VoiceResponse();
    try {
      const gather = vr.gather({
        numDigits: 1,
        action: '/ivr/gather',
      });
      gather.say(
        'Hi, Welcome to Turing Technologies. Press 1 to talk to our representative. Press 2 to leave voicmail',
      );
      vr.redirect('/ivr/voice');
      return vr.toString();
    } catch (e) {
      return e;
    }
  }

  transferCallBack(details: any) {
    const vr = new twiml.VoiceResponse();
    try {
      vr.hangup();
      const createCallDto: CreateCallDto = {
        caller: details.Caller,
        callerCountry: details.CallerCountry,
        callStatus: details.DialCallStatus,
        callTo: details.Called,
      };
      this.callService.logTransferCall(createCallDto);
      return vr.toString();
    } catch (e) {
      return e;
    }
  }
  voiceMailCallBack(details: any) {
    const vr = new twiml.VoiceResponse();
    try {
      vr.say('Thankyou for contacting us');
      vr.hangup();
      const createVoiceMailDto: CreateVoiceMailDto = {
        caller: details.Caller,
        callerCountry: details.CallerCountry,
        callTo: details.Called,
        recordingDuration: details.RecordingDuration,
        recordingUrl: details.RecordingUrl,
      };
      this.callService.logVoiceMail(createVoiceMailDto);
      return vr.toString();
    } catch (e) {
      return e;
    }
  }

  recordVoicemail() {
    try {
      const vr = new twiml.VoiceResponse();
      vr.record({
        action: encodeURI('/ivr/record/hangup'),
        finishOnKey: '#',
        playBeep: true,
      });
      return vr.toString();
    } catch (e) {
      return e;
    }
  }

  async transferCall() {
    const vr = new twiml.VoiceResponse();
    try {
      vr.dial(
        {
          action: '/ivr/transfercallback',
          method: 'POST',
        },
        this.configService.get('COMPANY_NUMBER')
       // '+923360575674',
      );
      return vr.toString();
    } catch (e) {
      return e;
    }
  }

  async gather(digits: any) {
    try {
      const vr = new twiml.VoiceResponse();
      console.log(digits);
      let res: any;
      if (digits) {
        const d = digits.Digits;
        switch (d) {
          case '1' || 1:
            vr.say('Your call has been transferred.');
            res = await this.transferCall();
            break;
          case '2' || 2:
            vr.say('Go ahead and leave voicemail after the beep');
            res = await this.recordVoicemail();
            break;
          default:
            vr.say('Sorry, I do not understand that choice.');
            vr.pause();
            vr.redirect('/ivr/voice');
            break;
        }
        return res;
      } else {
        vr.redirect('/ivr/voice');
      }
      return res;
    } catch (e) {
      return e;
    }
  }
}
