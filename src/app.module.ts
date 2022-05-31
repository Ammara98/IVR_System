import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TwilioModule } from 'nestjs-twilio';
import { CallModule } from './call/call.module';
import { IvrModule } from './ivr/ivr.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

   
      TwilioModule.forRootAsync({
        useFactory: async (configService: ConfigService) => ({
          accountSid: configService.get('ACCOUNT_SID'),
          authToken: configService.get('AUTH_TOKEN'),
    }),
    inject: [ConfigService],

     } ),

     MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
      }),
      inject: [ConfigService],
     }),
    IvrModule,
    CallModule,
    AuthModule,
  ],
})
export class AppModule {}
