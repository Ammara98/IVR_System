import {HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import ResponseHandler from 'src/common/response-handler';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') readonly userModel: Model<UserInterface>, // interface here or call document
    private jwtService: JwtService,
  ) {}
  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { username, password } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(password, salt);

    const newUser = new this.userModel({
      username: username,
      salt: salt,
      password: hashedPassword,
    });
    try {
      await newUser.save();
        return ResponseHandler.success(username);
    } catch (e) {

    return ResponseHandler.fail('Username already exists', HttpStatus.BAD_REQUEST)
    }
  }

  async validatePassword(
    password: string,
    salt: string,
    storedPassword: string,
  ): Promise<boolean> {
    const hash = await this.hashPassword(password, salt);
    return hash === storedPassword;
  }

  async createJwtAccessToken(
    payload: JwtPayload,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUserCredentials(
    logInDto: LogInDto,
  ): Promise<any> {
    const { username, password } = logInDto;
    const user = await this.userModel.findOne({ username: username });
    try {
      if (
        user &&
        (await this.validatePassword(password, user['salt'], user['password']))
      ) {
        const payload: JwtPayload = { username };
        const accessToken = await this.createJwtAccessToken(payload);
        return ResponseHandler.success(accessToken);
       // return accessToken;
      }
      return ResponseHandler.fail('Invalid username or password',HttpStatus.NOT_FOUND)
    } catch (e) {
      return e;
    }
  }
}
