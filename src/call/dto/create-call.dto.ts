import { IsNotEmpty } from 'class-validator';

export class CreateCallDto {
  @IsNotEmpty()
  caller: string;

  @IsNotEmpty()
  callStatus: string;

  @IsNotEmpty()
  callerCountry: string;

  @IsNotEmpty()
  callTo: string;
}
