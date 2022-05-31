import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TwilioModule } from 'nestjs-twilio';
import { CallModule } from './call/call.module';
import { IvrModule } from './ivr/ivr.module';
import { AuthModule } from './auth/auth.module';

// use
//console.log(process.env.AUTH_TOKEN) // localhost

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Method 1//

    // TwilioModule.forRoot({
    //   accountSid: process.env.ACCOUNT_SID,
    //   authToken: process.env.AUTH_TOKEN,

    //  } )
    // ,

    // Method 2 //
    //   TwilioModule.forRootAsync({
    //    imports: [ConfigModule],
    //     useFactory: async (configService: ConfigService) => ({
    //       accountSid: configService.get<string>('ACCOUNT_SID'),
    //       authToken: configService.get<string>('AUTH_TOKEN'),
    // }),
    // inject: [ConfigService],

    //  } ),

    ///////////// ------------------- NOTE --------------------///////////////////

    // I know I have to use environment file here, however, I can not figure out how to use configModule in app folder

    TwilioModule.forRoot({
      accountSid: 'ACe7c43ef60ffed35cd9d0622bf464c245',
      authToken: '9bf924d59f1fb6e6cba49f77995e9b05',
    }),
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/test'),

    IvrModule,
    CallModule,
    AuthModule,
  ],
})
export class AppModule {}
console.log(process.env.AUTH_TOKEN);
