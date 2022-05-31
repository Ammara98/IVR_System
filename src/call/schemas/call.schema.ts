import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CallDocument = Call & mongoose.Document;

@Schema({ timestamps: true })
export class Call {


  @Prop()
  caller: string;

  @Prop()
  callerCountry:string

  @Prop()
  callStatus: string; 

  @Prop()
  callTo:string

}
export const CallSchema = SchemaFactory.createForClass(Call);
