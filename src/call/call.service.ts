import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CallInterface } from './interfaces/call.interface';
import { CreateCallDto } from './dto/create-call.dto';

import { VoiceMailInterface } from './interfaces/voicemail.interface';
import { CreateVoiceMailDto } from './dto/create-voicemail.dto';

import ResponseHandler from '../common/response-handler'
@Injectable()
export class CallService {
  constructor(
    //remove private from here
    @InjectModel('Call') readonly callModel: Model<CallInterface>,
    @InjectModel('VoiceMail')
    readonly VoiceMailModel: Model<VoiceMailInterface>, // interface here or call document
  ) {}


  async logTransferCall(createCallDto: CreateCallDto): Promise<any> {
    const { callStatus, caller, callerCountry, callTo } = createCallDto;
    const newCall = new this.callModel({
      caller: caller,
      callerCountry: callerCountry,
      callStatus: callStatus,
      callTo: callTo,
    });
    const savedCall = await newCall.save();
    return ResponseHandler.success(savedCall);
  }
  async logVoiceMail(
    createVoiceMailDto: CreateVoiceMailDto,
  ): Promise<any> {
    const { caller, callerCountry, callTo, recordingDuration, recordingUrl } =
      createVoiceMailDto;
    const newVoiceMail = new this.VoiceMailModel({
      caller: caller,
      callerCountry: callerCountry,
      callTo: callTo,
      recordingDuration: recordingDuration,
      recordingUrl: recordingUrl,
    });
   const savedVoiceMail =  await newVoiceMail.save();
   return ResponseHandler.success(savedVoiceMail);
   
  }

  async getActivityFeed(): Promise<any> {
    const allCalls = await this.callModel.find();
    const allVoiceMails = await this.VoiceMailModel.find();
    const activity = { allCalls: allCalls, allVoiceMails: allVoiceMails }
    return ResponseHandler.success(activity)
  }
}
