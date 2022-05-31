import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CallInterface } from './interfaces/call.interface';
import { CreateCallDto } from './dto/create-call.dto';
import { CallDocument } from './schemas/call.schema';
import { VoiceMailInterface } from './interfaces/voicemail.interface';
import { CreateVoiceMailDto } from './dto/create-voicemail.dto';
import { VoiceMailDocument } from './schemas/voicemail.schema';
@Injectable()
export class CallService {
  constructor(
    //remove private from here
    @InjectModel('Call') readonly callModel: Model<CallInterface>,
    @InjectModel('VoiceMail') readonly VoiceMailModel: Model<VoiceMailInterface>,  // interface here or call document
  ) {}

  check(){
    console.log('in found call service')
  }

  async logTransferCall(createCallDto:CreateCallDto):Promise<CallDocument>{
    const {callStatus,caller,callerCountry,callTo} = createCallDto;
    const newCall = new this.callModel({
      caller: caller,
      callerCountry:callerCountry,
      callStatus:callStatus,
      callTo:callTo,
     // voiceMailLink:voiceMailLink,

    });
    await newCall.save();
    console.log(newCall);
    return newCall;
  }
  async logVoiceMail(createVoiceMailDto:CreateVoiceMailDto):Promise<VoiceMailDocument>{
    const {caller,callerCountry,callTo, recordingDuration, recordingUrl} = createVoiceMailDto;
    const newVoiceMail = new this.VoiceMailModel({
      caller: caller,
      callerCountry:callerCountry,
      callTo:callTo,
      recordingDuration:recordingDuration,
      recordingUrl:recordingUrl,

    });
    await newVoiceMail.save();
    console.log(newVoiceMail);
    return newVoiceMail;
  }

  async getActivityFeed():Promise<any>{
    const allCalls = await this.callModel.find()
    const allVoiceMails =await this.VoiceMailModel.find()

  return {allCalls:allCalls,allVoiceMails:allVoiceMails}


  }

}
