import { IsNotEmpty } from 'class-validator';

export class CreateVoiceMailDto {
  @IsNotEmpty()
  caller: string;

  @IsNotEmpty()
  callerCountry: string;

  @IsNotEmpty()
  recordingDuration: string;

  @IsNotEmpty()
  recordingUrl: string;

  @IsNotEmpty()
  callTo: string;
}
