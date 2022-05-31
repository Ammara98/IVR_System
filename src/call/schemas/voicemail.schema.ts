import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type VoiceMailDocument = VoiceMail & mongoose.Document;

@Schema({ timestamps: true })
export class VoiceMail {
  // @Prop()
  // dateTime: Date;

  @Prop()
  caller: string;

  @Prop()
  callerCountry: string;

  @Prop()
  callTo: string;

  @Prop()
  recordingDuration: string;

  @Prop()
  recordingUrl: string;
}
export const VoiceMailSchema = SchemaFactory.createForClass(VoiceMail);
