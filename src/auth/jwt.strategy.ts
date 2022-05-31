import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
//import { UserInterface } from './interfaces/user.interface';
//@InjectModel('User') private readonly userModel: Model<UserInterface>
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService,
    configService:ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
    
  }
  async validate(payload: JwtPayload): Promise<string> {
    const { username } = payload;
    const user = this.authService.userModel.findOne({ username: username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return (await user).username;
  }
}
