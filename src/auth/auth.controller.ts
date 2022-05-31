import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<string> {
    return await this.authService.signUp(signUpDto);
  }

  @Post('/login')
  async signIn(@Body() logInDto: LogInDto):Promise<{accessToken:string}> {
    return await this.authService.validateUserCredentials(logInDto);
  }
}
