import * as mongoose from 'mongoose';

export interface CallInterface extends mongoose.Document {
  _id: mongoose.ObjectId;
  voiceMailLink: string;
  createdAt: Date;
  caller: string;
  callerCountry: string;
  callStatus: string;
  callTo: string;
}
