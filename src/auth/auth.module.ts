import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema';
//import { JwtStrategy } from './jwt.strategy';
// import { ConfigService } from '@nestjs/config';
//import { JwtStrategy } from './jwt.strategy';

// const jwtFactory = {
//   useFactory: async (configService: ConfigService) => ({
//     secret: configService.get('JWT_SECRET'),
//     signOptions: {
//       expiresIn: configService.get('JWT_EXP_H'),
//     },
//   }),
//   inject: [ConfigService],
// };

@Module({
  imports: [
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
  providers: [AuthService],
  //JwtStrategy],

  //exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
