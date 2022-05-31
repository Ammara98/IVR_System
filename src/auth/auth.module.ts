import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema';
//import { JwtStrategy } from './jwt.strategy';
// import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    // ##############     Method 1    ################//

    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: process.env.JWT_EXPIRY,
    //   },
    // }),

    // ##############     Method 2     ################//

    // JwtModule.registerAsync({
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       secret: config.get<string>('JWT_SECRET'),
    //       signOptions: {
    //         expiresIn: config.get<string | number>('JWT_EXPIRY'),
    //       },
    //     };
    //   },
    //   inject: [ConfigService],
    // }),

    JwtModule.register({
      secret: 'secret_key',
      signOptions: {
        expiresIn: 3600,
      },
    }),


    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService,
  JwtStrategy],

  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
