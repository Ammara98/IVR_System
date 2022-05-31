import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { CallSchema } from './schemas/call.schema';
import { VoiceMailSchema } from './schemas/voicemail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Call', schema: CallSchema },
      { name: 'VoiceMail', schema: VoiceMailSchema },
    ]),
  ],
  controllers: [CallController],
  providers: [CallService],
  exports: [CallService],
})
export class CallModule {}
