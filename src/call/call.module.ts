import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
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
    AuthModule
  ],
  controllers: [CallController],
  providers: [CallService],
  exports: [CallService],
})
export class CallModule {}
