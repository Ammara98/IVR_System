import { Module } from '@nestjs/common';
import { CallModule } from 'src/call/call.module';
import { IvrController } from './ivr.controller';
import { IvrService } from './ivr.service';

@Module({
  imports: [CallModule],
  controllers: [IvrController],
  providers: [IvrService],
})
export class IvrModule {}
