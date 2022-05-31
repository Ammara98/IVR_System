import * as mongoose from 'mongoose';

export interface VoiceMailInterface extends mongoose.Document {
  _id: mongoose.ObjectId; //changed from number
  createdAt:Date;
  caller:string;
  callerCountry:string;
  callTo:string;
  recordingDuration:string,
  recordingUrl:string,
}
