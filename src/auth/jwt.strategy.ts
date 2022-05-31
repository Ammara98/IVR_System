import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { strategy, ExtractJwt } from 'passport-jwt';
//import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
//import { UserInterface } from './interfaces/user.interface';
//@InjectModel('User') private readonly userModel: Model<UserInterface>
@Injectable()
export class JwtStrategy extends PassportStrategy(strategy) {
  constructor() {
    //private authService: AuthService )// interface here or call document
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret_key',
    });
  }
  async validate(payload: JwtPayload): Promise<string> {
    //async validate(payload: JwtPayload):Promise<UserInterface>{
    const { username } = payload;
    // const user ='ws'
    const user = this.authService.userModel.findOne({ username: username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user.username;
  }
}
