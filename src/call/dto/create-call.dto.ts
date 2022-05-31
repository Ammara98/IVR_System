import { IsNotEmpty, IsIn, IsOptional } from 'class-validator';

export class CreateCallDto {

  @IsNotEmpty()
  caller: string;


  @IsNotEmpty()
  callStatus: string;

  @IsNotEmpty()
  callerCountry:string

  @IsNotEmpty()
  callTo:string;  

  
  // @IsOptional()
  // voiceMailLink: string;
}
